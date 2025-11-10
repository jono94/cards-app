from abc import abstractmethod
from copy import deepcopy
from typing import Protocol
from sqlalchemy.ext.asyncio import AsyncSession

from cards_app_backend.template_gallery.repository import (
    CardTemplateRepositoryInterface,
    FileRepositoryInterface,
    InMemoryCardTemplateRepository,
    InMemoryFileRepository,
)


class UnitOfWorkInterface(Protocol):
    card_template_repository: CardTemplateRepositoryInterface
    file_repository: FileRepositoryInterface

    def __init__(self, card_template_repository: CardTemplateRepositoryInterface, file_repository: FileRepositoryInterface):
        pass

    @abstractmethod
    async def __aenter__(self) -> "UnitOfWorkInterface":
        pass

    @abstractmethod
    async def __aexit__(self, exc_type, exc_value, traceback) -> None:
        pass

    @abstractmethod
    async def commit(self) -> None:
        pass

    @abstractmethod
    async def rollback(self) -> None:
        pass


class InMemoryUnitOfWork(UnitOfWorkInterface):
    def __init__(self, card_template_repository: CardTemplateRepositoryInterface, file_repository: FileRepositoryInterface):
        self.card_template_repository = card_template_repository
        self.file_repository = file_repository

    async def __aenter__(self) -> "InMemoryUnitOfWork":
        # Store initial state
        if isinstance(self.card_template_repository, InMemoryCardTemplateRepository):
            self._initial_card_templates = deepcopy(self.card_template_repository.templates)
        if isinstance(self.file_repository, InMemoryFileRepository):
            self._initial_files = deepcopy(self.file_repository.files)
        return self

    async def __aexit__(self, exc_type, exc_value, traceback) -> None:
        if exc_type:
            await self.rollback()
        else:
            await self.commit()

    async def commit(self) -> None:
        pass

    async def rollback(self) -> None:
        # Restore initial state
        if isinstance(self.card_template_repository, InMemoryCardTemplateRepository):
            self.card_template_repository.templates = self._initial_card_templates
        if isinstance(self.file_repository, InMemoryFileRepository):
            self.file_repository.files = self._initial_files


class PostgresFileSystemUnitOfWork(UnitOfWorkInterface):
    def __init__(
        self,
        sql_session: AsyncSession,
        card_template_repository: CardTemplateRepositoryInterface,
        file_repository: FileRepositoryInterface,
    ):
        self.sql_session = sql_session
        self.card_template_repository = card_template_repository
        self.file_repository = file_repository

    async def __aenter__(self) -> "PostgresFileSystemUnitOfWork":
        return self

    async def __aexit__(self, exc_type, exc_value, traceback) -> None:
        if exc_type:
            await self.rollback()
        else:
            await self.commit()

    async def commit(self) -> None:
        await self.sql_session.commit()

    async def rollback(self) -> None:
        await self.sql_session.rollback()
