import json
import pathlib
import uuid
from abc import abstractmethod
from copy import deepcopy
from tempfile import NamedTemporaryFile
from typing import Protocol
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .domain_models import CardTemplate, ImageFile
from .exceptions import AlreadyExistsException, NotExistsException
from .db_models import CardTemplateModel, CardTemplateCategoryModel


class CardTemplateRepositoryInterface(Protocol):
    @abstractmethod
    async def list_card_template(self) -> list[CardTemplate]:
        pass

    @abstractmethod
    async def get_card_template(self, card_template_id: str) -> CardTemplate:
        pass

    @abstractmethod
    async def create_card_template(self, card_template: CardTemplate) -> CardTemplate:
        pass

    @abstractmethod
    async def update_card_template(self, card_template: CardTemplate) -> CardTemplate:
        pass

    @abstractmethod
    async def delete_card_template(self, card_template: CardTemplate) -> None:
        pass


IN_MEMORY_CARD_TEMPLATES: list[CardTemplate] = []


class InMemoryCardTemplateRepository(CardTemplateRepositoryInterface):
    def __init__(self, initial_in_memory_data_file: str | None = None):
        self.templates: list[CardTemplate] = IN_MEMORY_CARD_TEMPLATES
        if initial_in_memory_data_file and not self.templates:
            with open(initial_in_memory_data_file) as f:
                initial_data = json.load(f)
            self.templates.extend([CardTemplate(**template) for template in initial_data["card_templates"]])

    async def list_card_template(self) -> list[CardTemplate]:
        return deepcopy(self.templates)

    async def get_card_template(self, card_template_id: str) -> CardTemplate:
        for template in self.templates:
            if template.uuid == card_template_id:
                return deepcopy(template)
        raise NotExistsException(f"Card template with id {card_template_id} not found")

    async def create_card_template(self, card_template: CardTemplate) -> CardTemplate:
        try:
            await self.get_card_template(card_template.uuid)
        except NotExistsException:
            self.templates.append(card_template)
            return card_template
        raise AlreadyExistsException(f"Card template with id {card_template.uuid} already exists")

    async def update_card_template(self, card_template: CardTemplate) -> CardTemplate:
        for template in self.templates:
            if template.uuid == card_template.uuid:
                template.categories = card_template.categories
                template.name = card_template.name
                template.description = card_template.description
                template.image_file_name = card_template.image_file_name
                template.updated_at = card_template.updated_at
                return template

        raise NotExistsException(f"Card template with id {card_template.uuid} not found")

    async def delete_card_template(self, card_template: CardTemplate) -> None:
        # Check the card template exists - it will throw an exception if it doesn't
        await self.get_card_template(card_template.uuid)

        # Delete the card template
        self.templates[:] = [template for template in self.templates if template.uuid != card_template.uuid]


def card_template_orm_to_domain(card_template_orm_model: CardTemplateModel) -> CardTemplate:
    return CardTemplate(
        uuid=card_template_orm_model.uuid,
        name=card_template_orm_model.name,
        description=card_template_orm_model.description,
        categories=[category.name for category in card_template_orm_model.categories],
        image_file_name=card_template_orm_model.image_file_name,
        likes=card_template_orm_model.likes,
        created_at=card_template_orm_model.created_at,
        updated_at=card_template_orm_model.updated_at,
    )


class PostgresCardTemplateRepository(CardTemplateRepositoryInterface):
    def __init__(self, sql_session: AsyncSession):
        self.sql_session = sql_session

    async def _get_card_template_orm_model(self, card_template_id: str) -> CardTemplateModel:
        card_template_orm_model = await self.sql_session.get(
            CardTemplateModel, card_template_id, options=[selectinload(CardTemplateModel.categories)]
        )
        if not card_template_orm_model:
            raise NotExistsException(f"Card template with id {card_template_id} not found")
        return card_template_orm_model

    async def list_card_template(self) -> list[CardTemplate]:
        stmt = select(CardTemplateModel).options(selectinload(CardTemplateModel.categories)).order_by(CardTemplateModel.created_at.desc())
        result = await self.sql_session.execute(stmt)
        card_template_orm_models = result.scalars().all()

        return [card_template_orm_to_domain(card_template_orm_model) for card_template_orm_model in card_template_orm_models]

    async def get_card_template(self, card_template_id: str) -> CardTemplate:
        card_template_orm_model = await self._get_card_template_orm_model(card_template_id)
        return card_template_orm_to_domain(card_template_orm_model)

    async def create_card_template(self, card_template: CardTemplate) -> CardTemplate:
        card_template_orm_model = CardTemplateModel(
            uuid=card_template.uuid,
            name=card_template.name,
            description=card_template.description,
            categories=[CardTemplateCategoryModel(uuid=str(uuid.uuid4()), name=category) for category in card_template.categories],
            image_file_name=card_template.image_file_name,
            likes=card_template.likes,
            created_at=card_template.created_at,
            updated_at=card_template.updated_at,
        )

        self.sql_session.add(card_template_orm_model)
        await self.sql_session.flush()

        return card_template_orm_to_domain(card_template_orm_model)

    async def update_card_template(self, card_template: CardTemplate) -> CardTemplate:
        card_template_orm_model = await self._get_card_template_orm_model(card_template.uuid)

        card_template_orm_model.name = card_template.name
        card_template_orm_model.description = card_template.description
        card_template_orm_model.categories = [
            CardTemplateCategoryModel(uuid=str(uuid.uuid4()), name=category) for category in card_template.categories
        ]
        card_template_orm_model.image_file_name = card_template.image_file_name
        card_template_orm_model.likes = card_template.likes
        card_template_orm_model.updated_at = card_template.updated_at

        await self.sql_session.flush()
        return card_template_orm_to_domain(card_template_orm_model)

    async def delete_card_template(self, card_template: CardTemplate) -> None:
        card_template_orm_model = await self._get_card_template_orm_model(card_template.uuid)

        await self.sql_session.delete(card_template_orm_model)
        await self.sql_session.flush()


class FileRepositoryInterface(Protocol):
    @abstractmethod
    async def get_file(self, file_name: str) -> ImageFile:
        pass

    @abstractmethod
    async def get_file_path(self, file_name: str) -> str:
        pass

    @abstractmethod
    async def store_file(self, file: ImageFile) -> None:
        pass

    @abstractmethod
    async def delete_file(self, file_name: str) -> None:
        pass


IN_MEMORY_IMAGE_FILES: dict[str, ImageFile] = {}


class InMemoryFileRepository(FileRepositoryInterface):
    def __init__(self, initial_in_memory_image_files_directory: str | None = None):
        self.files: dict[str, ImageFile] = IN_MEMORY_IMAGE_FILES  # image file name -> image file
        if initial_in_memory_image_files_directory and not self.files:
            for file_name in pathlib.Path(initial_in_memory_image_files_directory).iterdir():
                with open(file_name, "rb") as f:
                    self.files[file_name.name] = ImageFile.create_from_filename(file_name.name, f.read())

    async def get_file(self, file_name: str) -> ImageFile:
        if file_name not in self.files:
            raise NotExistsException(f"File with image file name {file_name} not found")
        return self.files[file_name]

    async def get_file_path(self, file_name: str) -> str:
        if file_name not in self.files:
            raise NotExistsException(f"File with image file name {file_name} not found")
        image_file = self.files[file_name]

        # Since its in memory, we need to create a temporary file to return the path
        tmp_file = NamedTemporaryFile(delete=False)
        tmp_file.write(image_file.content)
        tmp_file.flush()
        tmp_file.close()

        return tmp_file.name

    async def store_file(self, file: ImageFile) -> None:
        if file.name in self.files:
            raise AlreadyExistsException(f"File with image file name {file.name} already exists")
        self.files[file.name] = file

    async def delete_file(self, file_name: str) -> None:
        if file_name not in self.files:
            raise NotExistsException(f"File with image file name {file_name} not found")
        del self.files[file_name]


class FileSystemFileRepository(FileRepositoryInterface):
    def __init__(self, storage_directory: str):
        self.storage_directory_path = pathlib.Path(storage_directory)

    def _get_file_path(self, file_name: str) -> pathlib.Path:
        return self.storage_directory_path / pathlib.Path(file_name)

    async def get_file(self, file_name: str) -> ImageFile:
        # Get the full file path and check if it exists
        file_path = self._get_file_path(file_name)
        if not file_path.exists():
            raise NotExistsException(f"File with image file name {file_name} not found")

        # Read the file
        with open(file_path, "rb") as f:
            return ImageFile.create_from_filename(file_name, f.read())

    async def get_file_path(self, file_name: str) -> str:
        return str(self._get_file_path(file_name))

    async def store_file(self, file: ImageFile) -> None:
        # Get the full file path and check if it exists
        file_path = self._get_file_path(file.name)
        if file_path.exists():
            raise AlreadyExistsException(f"File with image file name {file.name} already exists")

        # Create the file
        with open(file_path, "wb") as f:
            f.write(file.content)

    async def delete_file(self, file_name: str) -> None:
        # Get the full file path and check if it exists
        file_path = self._get_file_path(file_name)
        if not file_path.exists():
            raise NotExistsException(f"File with image file name {file_name} not found")

        # Delete the file
        file_path.unlink()
