import uuid
from datetime import UTC, datetime

from pydantic import BaseModel, Field, field_validator


class CardTemplate(BaseModel):
    uuid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    categories: list[str]
    image_file_name: str  # File path in the file system
    image_uri_base: str | None = None  # Base URL to the image files (prefix to append to the DB image URI)
    likes: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @property
    def image_uri(self) -> str:
        if self.image_uri_base:
            return f"{self.image_uri_base}{self.image_file_name}"
        return self.image_file_name


class ImageFile(BaseModel):
    type: str
    content: bytes
    image_file_name: str | None = None

    @field_validator("type", mode="after")
    @classmethod
    def validate_type(cls, value: str) -> str:
        if value not in ["image/png", "image/jpeg", "image/jpg"]:
            raise ValueError("Invalid image type")
        return value

    @property
    def extension(self) -> str:
        if self.type == "image/png":
            return ".png"
        elif self.type == "image/jpeg":
            return ".jpeg"
        elif self.type == "image/jpg":
            return ".jpg"
        else:
            raise ValueError("Invalid image type")
