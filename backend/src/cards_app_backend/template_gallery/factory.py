from cards_app_backend.config.settings import RepositoryType, get_settings

from .application_service import CardTemplateApplicationService
from .repository import (
    CardTemplateRepositoryInterface,
    FileRepositoryInterface,
    InMemoryCardTemplateRepository,
    InMemoryFileRepository,
    FileSystemFileRepository,
)
from .unit_of_work import InMemoryUnitOfWork, UnitOfWorkInterface, PostgresFileSystemUnitOfWork

settings = get_settings()


class Factory:
    @staticmethod
    def create_card_template_repository() -> CardTemplateRepositoryInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryCardTemplateRepository(settings.initial_in_memory_data_file)
        elif settings.repository_type == RepositoryType.POSTGRES_FILE_SYSTEM:
            return InMemoryCardTemplateRepository(settings.initial_in_memory_data_file)  # FIXME: Implement Postgres
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
            return PostgresFileSystemUnitOfWork(Factory.create_card_template_repository(), Factory.create_file_repository())
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    def create_card_template_application_service() -> CardTemplateApplicationService:
        return CardTemplateApplicationService(Factory.create_unit_of_work())
