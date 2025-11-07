import logging
from cards_app_backend.user_management.domain_models import User
from firebase_admin import auth, credentials, initialize_app, tenant_mgt
from cards_app_backend.template_gallery.exceptions import AuthenticationError

LOGGER = logging.getLogger(__name__)


def initialize_gcp_auth(project_id: str, path_to_service_account_file: str | None = None) -> None:
    if path_to_service_account_file:
        # Production usage
        cred = credentials.Certificate(path_to_service_account_file)
        initialize_app(cred, options={"projectId": project_id})
    else:
        # Development usage - with Firebase Emulators
        initialize_app(options={"projectId": project_id})


def verify_firebase_id_token(id_token: str) -> User:
    """
    {
        'name': 'Name',
        'picture': '',
        'email': 'email@gmail.com',
        'email_verified': True,
        'auth_time': 1762490979,
        'user_id': 'asdkjfhasldfhasdf',
        'firebase': {
            'identities': {
                'email': ['email@gmail.com']
            },
            'sign_in_provider': 'password'
        },
        'iat': 1762490979,
        'exp': 1762494579,
        'aud': 'project-id',
        'iss': 'https://securetoken.google.com/cards-app-dev',
        'sub': 'asdkjfhasldfhasdf',
        'uid': 'asdkjfhasldfhasdf'
    }
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        LOGGER.info(f"ID token verified successfully: {decoded_token}")
    except auth.InvalidIdTokenError as exc:
        LOGGER.error(f"ID token provided was not from Firebase: {exc}")
        raise AuthenticationError("Failed to verify the ID token") from exc
    except (auth.ExpiredIdTokenError, auth.RevokedIdTokenError, auth.UserDisabledError) as exc:
        LOGGER.error(f"ID token provided has expired, has been revoked or the user is disabled: {exc}")
        raise AuthenticationError("Failed to verify the ID token") from exc
    except tenant_mgt.TenantIdMismatchError as exc:
        LOGGER.error(f"ID token provided was not for the correct tenant, is the project ID configured correctly? {exc}")
        raise AuthenticationError("Failed to verify the ID token") from exc
    except auth.CertificateFetchError as exc:
        LOGGER.error("Failed to fetch the certificate for the ID token, is there an internet connection?", exc_info=True)
        raise AuthenticationError("Failed to verify the ID token") from exc

    try:
        return User(
            user_id=decoded_token["uid"],
            email=decoded_token["email"],
            name=decoded_token.get("name", ""),
            picture=decoded_token.get("picture", ""),
            email_verified=decoded_token["email_verified"],
        )
    except KeyError as exc:
        LOGGER.error(f"Missing key in the decoded token: {exc.args[0]}")
        raise AuthenticationError("Failed to verify the ID token") from exc
