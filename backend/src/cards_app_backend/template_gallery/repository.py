import json
import pathlib
import uuid
from abc import abstractmethod
from copy import deepcopy
from tempfile import NamedTemporaryFile
from typing import Protocol

from .domain_models import CardTemplate, ImageFile
from .exceptions import AlreadyExistsException, NotExistsException


class CardTemplateRepositoryInterface(Protocol):
    templates: list[CardTemplate]

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
    def __init__(self, initial_in_memory_data_file: str | None = None, image_uri_base: str | None = None):
        self.templates: list[CardTemplate] = IN_MEMORY_CARD_TEMPLATES
        self.image_uri_base = image_uri_base
        if initial_in_memory_data_file and not self.templates:
            with open(initial_in_memory_data_file) as f:
                initial_data = json.load(f)
            self.templates.extend([CardTemplate(**template) for template in initial_data["card_templates"]])

    def _add_image_uri_base(self, template: CardTemplate) -> CardTemplate:
        if self.image_uri_base:
            template.image_uri_base = self.image_uri_base
        return template

    async def list_card_template(self) -> list[CardTemplate]:
        templates = deepcopy(self.templates)
        return [self._add_image_uri_base(template) for template in templates]

    async def get_card_template(self, card_template_id: str) -> CardTemplate:
        for template in self.templates:
            if template.uuid == card_template_id:
                return self._add_image_uri_base(deepcopy(template))
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


class FileRepositoryInterface(Protocol):
    files: dict[str, ImageFile]

    @abstractmethod
    async def get_file_path(self, image_uri: str) -> str:
        pass

    @abstractmethod
    async def store_file(self, file: ImageFile) -> str:
        pass

    @abstractmethod
    async def delete_file(self, image_file_name: str) -> None:
        pass


IN_MEMORY_IMAGE_FILES: dict[str, ImageFile] = {}


class InMemoryFileRepository(FileRepositoryInterface):
    def __init__(self, initial_in_memory_image_files_directory: str | None = None, image_uri_base: str | None = None):
        self.files: dict[str, ImageFile] = IN_MEMORY_IMAGE_FILES  # image file name -> image file
        self.image_uri_base = image_uri_base
        if initial_in_memory_image_files_directory and not self.files:
            for file_name in pathlib.Path(initial_in_memory_image_files_directory).iterdir():
                with open(file_name, "rb") as f:
                    self.files[file_name.name] = ImageFile(type="image/png", content=f.read())

    def _strip_image_uri_base(self, image_uri: str) -> str:
        if self.image_uri_base:
            return image_uri.removeprefix(self.image_uri_base)
        return image_uri

    async def get_file_path(self, image_uri: str) -> str:
        image_file_name = self._strip_image_uri_base(image_uri)
        if image_file_name not in self.files:
            raise NotExistsException(f"File with image file name {image_file_name} not found")
        image_file = self.files[image_file_name]

        tmp_file = NamedTemporaryFile(delete=False)
        tmp_file.write(image_file.content)
        tmp_file.flush()
        tmp_file.close()

        return tmp_file.name

    async def store_file(self, file: ImageFile) -> str:
        if file.image_file_name:
            raise AlreadyExistsException(f"File with image file name {file.image_file_name} already exists")

        image_file_name = str(uuid.uuid4()) + file.extension
        file.image_file_name = image_file_name

        self.files[image_file_name] = file
        return image_file_name

    async def delete_file(self, image_file_name: str) -> None:
        if image_file_name not in self.files:
            raise NotExistsException(f"File with image file name {image_file_name} not found")
        del self.files[image_file_name]
