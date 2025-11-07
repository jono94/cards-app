from typing import Annotated
from fastapi import Header
from cards_app_backend.template_gallery.exceptions import AuthenticationError
from cards_app_backend.integrations.gcp import verify_firebase_id_token


async def get_current_user(authorization: Annotated[str, Header()]):
    if not authorization or not authorization.startswith("Bearer "):
        raise AuthenticationError("Invalid authorization header")

    token = authorization.split(" ")[1]
    user = verify_firebase_id_token(token)

    if not user.email_verified:
        raise AuthenticationError("Email not verified, please verify your email to continue")

    return user
