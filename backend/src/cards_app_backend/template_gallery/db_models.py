from cards_app_backend.core.db_model_base import ModelBase
from cards_app_backend.template_gallery.domain_models import CardTemplateCategory
from sqlalchemy import String, DateTime, Integer, Enum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime


class CardTemplateModel(ModelBase):
    __tablename__ = "card_templates"

    uuid: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    categories: Mapped[list["CardTemplateCategoryModel"]] = relationship(cascade="all, delete-orphan")
    image_file_name: Mapped[str] = mapped_column(String, nullable=False)
    likes: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)


class CardTemplateCategoryModel(ModelBase):
    __tablename__ = "card_template_categories"

    uuid: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[CardTemplateCategory] = mapped_column(Enum(CardTemplateCategory), nullable=False)
    card_template_uuid: Mapped[str] = mapped_column(String, ForeignKey("card_templates.uuid", ondelete="CASCADE"), nullable=False)

    __table_args__ = (
        # We shouldn't have duplicate categories for the same card template
        UniqueConstraint(card_template_uuid, name, name="unique_card_template_category"),
    )
