from pydantic import BaseModel


class User(BaseModel):
    user_id: str  # Unique ID of the user, from the Auth service provider
    email: str
    name: str
    picture: str
    email_verified: bool
