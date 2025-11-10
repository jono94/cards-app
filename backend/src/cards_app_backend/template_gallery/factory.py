from cards_app_backend.config.settings import RepositoryType, get_settings
from cards_app_backend.config.dependencies.sql_database import get_database_session_factory
from sqlalchemy.ext.asyncio import AsyncSession
from collections.abc import AsyncGenerator

from .application_service import CardTemplateApplicationService
from .repository import (
    CardTemplateRepositoryInterface,
    FileRepositoryInterface,
    InMemoryCardTemplateRepository,
    InMemoryFileRepository,
    FileSystemFileRepository,
    PostgresCardTemplateRepository,
)
from .unit_of_work import InMemoryUnitOfWork, UnitOfWorkInterface, PostgresFileSystemUnitOfWork

settings = get_settings()


class Factory:
    @staticmethod
    def create_card_template_repository(sql_session: AsyncSession | None = None) -> CardTemplateRepositoryInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryCardTemplateRepository(settings.initial_in_memory_data_file)
        elif settings.repository_type == RepositoryType.POSTGRES_FILE_SYSTEM:
            assert sql_session is not None
            return PostgresCardTemplateRepository(sql_session)
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    def create_file_repository() -> FileRepositoryInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryFileRepository(settings.initial_in_memory_image_files_directory)
        elif settings.repository_type == RepositoryType.POSTGRES_FILE_SYSTEM:
            assert settings.file_system_storage_directory is not None
            return FileSystemFileRepository(settings.file_system_storage_directory)
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    def create_unit_of_work() -> UnitOfWorkInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryUnitOfWork(Factory.create_card_template_repository(), Factory.create_file_repository())
        elif settings.repository_type == RepositoryType.POSTGRES_FILE_SYSTEM:
            assert settings.sql_database_url is not None
            sql_session = get_database_session_factory(settings.sql_database_url)()
            return PostgresFileSystemUnitOfWork(
                sql_session, Factory.create_card_template_repository(sql_session), Factory.create_file_repository()
            )
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    async def create_card_template_application_service() -> AsyncGenerator[CardTemplateApplicationService, None]:
        async with Factory.create_unit_of_work() as uow:
            yield CardTemplateApplicationService(uow)
