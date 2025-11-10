from typing import Self
from enum import StrEnum
from functools import lru_cache

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class RepositoryType(StrEnum):
    IN_MEMORY = "in_memory"
    POSTGRES_FILE_SYSTEM = "postgres_file_system"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )

    # App settings
    app_name: str = Field(default="Cards App")

    # Repository settings
    repository_type: RepositoryType = Field(default=RepositoryType.IN_MEMORY)
    initial_in_memory_data_file: str | None = Field(default=None, description="File path to the initial data for the in memory repository")
    initial_in_memory_image_files_directory: str | None = Field(
        default=None, description="Directory path to the initial image files for the in memory repository"
    )
    file_system_storage_directory: str | None = Field(
        default=None, description="Directory path to the file system storage for the file system repository"
    )

    @model_validator(mode="after")
    def validate_repository_type(self) -> Self:
        if self.repository_type == RepositoryType.POSTGRES_FILE_SYSTEM:
            if self.file_system_storage_directory is None:
                raise ValueError("File system storage directory is required for the file system repository")
            if self.sql_database_url is None:
                raise ValueError("SQL database URL is required for the file system repository")

        return self

    # Postgres settings
    postgres_username: str = Field(default="postgres", description="Username for the Postgres database")
    postgres_password: str = Field(default="postgres", description="Password for the Postgres database")
    postgres_host: str = Field(default="localhost", description="Host for the Postgres database")
    postgres_port: int = Field(default=5432, description="Port for the Postgres database")
    postgres_database_name: str = Field(default="cards_app_backend", description="Database name for the Postgres database")

    @property
    def sql_database_url(self) -> str:
        return f"postgresql+asyncpg://{self.postgres_username}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_database_name}"

    # Authentication settings
    gcp_project_id: str = Field(default="cards-app-development", description="GCP project ID for the GCP Admin SDK")
    firebase_auth_emulator_host: str | None = Field(
        default=None, description="URL to the Firebase Auth emulator (without http://). Note this MUST be an environment variable"
    )

    # API settings
    cors_origins: list[str] = Field(default=["http://localhost:8081"])


@lru_cache
def get_settings() -> Settings:
    """Function to get the settings. Decorated with lru_cache to cache the result so we aren't re-reading the .env file on every request."""
    return Settings()
