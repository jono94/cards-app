from collections.abc import Callable
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


def get_database_session_factory(database_url: str) -> Callable[[], AsyncSession]:
    # Create the engine
    async_engine = create_async_engine(database_url)

    # Create the session factory
    async_session_factory = async_sessionmaker(async_engine, autocommit=False, autoflush=False, expire_on_commit=False)

    return async_session_factory
