import mimetypes
import uuid
from datetime import UTC, datetime
from enum import StrEnum

from pydantic import BaseModel, Field, field_validator

from cards_app_backend.template_gallery.exceptions import InvalidDataException


class CardTemplateCategory(StrEnum):
    BIRTHDAY = "BIRTHDAY"
    SYMPATHY = "SYMPATHY"
    GET_WELL_SOON = "GET_WELL_SOON"
    CONGRATULATIONS = "CONGRATULATIONS"


class CardTemplate(BaseModel):
    uuid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    categories: list[CardTemplateCategory]
    image_file_name: str  # File path in the file system
    likes: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class ImageFile(BaseModel):
    uuid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mimetype: str
    content: bytes

    @staticmethod
    def create_from_filename(filename: str, content: bytes) -> "ImageFile":
        uuid = filename.split(".")[0]

        mimetype = mimetypes.guess_type(filename)[0]
        if mimetype is None:
            raise InvalidDataException("Invalid image file name, could not guess the mimetype")

        return ImageFile(uuid=uuid, mimetype=mimetype, content=content)

    @field_validator("mimetype", mode="after")
    @classmethod
    def validate_mimetype(cls, value: str) -> str:
        if value not in ["image/png", "image/jpeg", "image/jpg"]:
            raise ValueError(f"Invalid image mimetype: {value}")
        return value

    @property
    def extension(self) -> str:
        if self.mimetype == "image/png":
            return "png"
        elif self.mimetype == "image/jpeg":
            return "jpeg"
        elif self.mimetype == "image/jpg":
            return "jpg"
        else:
            raise ValueError("Invalid image type")

    @property
    def name(self) -> str:
        return f"{self.uuid}.{self.extension}"
