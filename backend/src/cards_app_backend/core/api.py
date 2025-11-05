import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cards_app_backend.config.settings import get_settings
from cards_app_backend.template_gallery.api import template_gallery_api

settings = get_settings()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(template_gallery_api)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
