from cards_app_backend.config.settings import get_settings
from cards_app_backend.integrations.gcp import initialize_gcp_auth


def initialize_gcp():
    settings = get_settings()
    initialize_gcp_auth(settings.gcp_project_id)
