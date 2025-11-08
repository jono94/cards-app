from cards_app_backend.config.settings import RepositoryType, get_settings

from .application_service import CardTemplateApplicationService
from .repository import CardTemplateRepositoryInterface, FileRepositoryInterface, InMemoryCardTemplateRepository, InMemoryFileRepository
from .unit_of_work import InMemoryUnitOfWork, UnitOfWorkInterface

settings = get_settings()


class Factory:
    @staticmethod
    def create_card_template_repository() -> CardTemplateRepositoryInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryCardTemplateRepository(settings.initial_in_memory_data_file)
        elif settings.repository_type == RepositoryType.POSTGRES:
            raise ValueError("Postgres repository type is not supported yet")
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    def create_file_repository() -> FileRepositoryInterface:
        if settings.repository_type == RepositoryType.IN_MEMORY:
            return InMemoryFileRepository(settings.initial_in_memory_image_files_directory)
        elif settings.repository_type == RepositoryType.POSTGRES:
            raise ValueError("Postgres repository type is not supported yet")
        else:
            raise ValueError(f"Invalid repository type: {settings.repository_type}")

    @staticmethod
    def create_unit_of_work() -> UnitOfWorkInterface:
        return InMemoryUnitOfWork(Factory.create_card_template_repository(), Factory.create_file_repository())

    @staticmethod
    def create_card_template_application_service() -> CardTemplateApplicationService:
        return CardTemplateApplicationService(Factory.create_unit_of_work())
