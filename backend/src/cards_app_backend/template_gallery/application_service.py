from .domain_models import CardTemplate, ImageFile
from .exceptions import InvalidDataException
from .unit_of_work import UnitOfWorkInterface


class CardTemplateApplicationService:
    def __init__(self, uow: UnitOfWorkInterface):
        self.uow = uow

    async def list_card_template(self) -> list[CardTemplate]:
        async with self.uow as uow:
            return await uow.card_template_repository.list_card_template()

    async def get_card_template(self, card_template_id: str) -> CardTemplate:
        async with self.uow as uow:
            return await uow.card_template_repository.get_card_template(card_template_id)

    async def create_card_template(
        self, name: str, description: str, mimetype: str, image: bytes, categories: list[str] | None = None
    ) -> CardTemplate:
        async with self.uow as uow:
            # Create and store image
            image_file = ImageFile(mimetype=mimetype, content=image)
            await uow.file_repository.store_file(image_file)

            # Create and store card template
            card_template = CardTemplate(name=name, description=description, categories=categories or [], image_file_name=image_file.name)
            stored_card_template = await uow.card_template_repository.create_card_template(card_template)

            # Return the stored card template
            return stored_card_template

    async def update_card_template(
        self,
        card_template_id: str,
        name: str | None = None,
        description: str | None = None,
        categories: list[str] | None = None,
        mimetype: str | None = None,
        image: bytes | None = None,
    ) -> CardTemplate:
        async with self.uow as uow:
            card_template = await uow.card_template_repository.get_card_template(card_template_id)

            # Update card template
            if name:
                card_template.name = name
            if description:
                card_template.description = description
            if categories:
                card_template.categories = categories
            if image:
                if mimetype is None:
                    raise InvalidDataException("Image type is required")

                # Create and store image
                image_file = ImageFile(mimetype=mimetype, content=image)
                await uow.file_repository.store_file(image_file)

                # Remove old image
                await uow.file_repository.delete_file(card_template.image_file_name)

                # Update card template's image file name
                card_template.image_file_name = image_file.name

            # Store the updated card template
            stored_card_template = await uow.card_template_repository.update_card_template(card_template)

            # Return the stored card template
            return stored_card_template

    async def delete_card_template(self, card_template_id: str) -> None:
        async with self.uow as uow:
            # Get card template
            card_template = await uow.card_template_repository.get_card_template(card_template_id)

            # Delete card template and image file
            await uow.card_template_repository.delete_card_template(card_template)
            await uow.file_repository.delete_file(card_template.image_file_name)

    async def get_image_path(self, file_name: str) -> str:
        async with self.uow as uow:
            return await uow.file_repository.get_file_path(file_name)
