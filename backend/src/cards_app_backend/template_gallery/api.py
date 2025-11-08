from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel

from .domain_models import CardTemplate
from .factory import Factory

template_gallery_api = APIRouter(prefix="/api/v1/template-gallery")


class CardTemplateResponse(BaseModel):
    uuid: str
    categories: list[str]
    name: str
    description: str
    image_file_name: str
    likes: int
    created_at: datetime
    updated_at: datetime


### LIST
@template_gallery_api.get("/", response_model=list[CardTemplateResponse])
async def list_card_templates() -> list[CardTemplate]:
    application_service = Factory.create_card_template_application_service()
    return await application_service.list_card_template()


### DETAIL
@template_gallery_api.get("/{card_template_id}", response_model=CardTemplateResponse)
async def get_card_template(card_template_id: str) -> CardTemplate:
    application_service = Factory.create_card_template_application_service()
    return await application_service.get_card_template(card_template_id)


### CREATE
@template_gallery_api.post("/", response_model=CardTemplateResponse)
async def create_card_template(
    name: Annotated[str, Form()],
    description: Annotated[str, Form()],
    image: UploadFile,
    categories: Annotated[list[str] | None, Form()] = None,
) -> CardTemplate:
    application_service = Factory.create_card_template_application_service()
    if image.content_type is None or image.file is None:
        raise HTTPException(status_code=400, detail="Invalid image")

    image_content = image.file.read()
    return await application_service.create_card_template(name, description, image.content_type, image_content, categories)


### UPDATE
@template_gallery_api.put("/{card_template_id}", response_model=CardTemplateResponse)
async def update_card_template(
    card_template_id: str,
    name: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    image: UploadFile | None = None,
    categories: Annotated[list[str] | None, Form()] = None,
) -> CardTemplate:
    image_type = image.content_type if image else None
    image_content = image.file.read() if image else None

    application_service = Factory.create_card_template_application_service()
    return await application_service.update_card_template(card_template_id, name, description, categories, image_type, image_content)


### DELETE
@template_gallery_api.delete("/{card_template_id}")
async def delete_card_template(card_template_id: str) -> None:
    application_service = Factory.create_card_template_application_service()
    return await application_service.delete_card_template(card_template_id)


### GET Image
@template_gallery_api.get("/images/{image_file_name}")
async def get_image(image_file_name: str) -> FileResponse:
    application_service = Factory.create_card_template_application_service()
    file_path = await application_service.get_image_path(image_file_name)
    return FileResponse(file_path)
