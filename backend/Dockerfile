# Dockerfile for the Cards App Backend using uv for package management and uvicorn for the webserver
# References:
# - https://docs.astral.sh/uv/guides/integration/docker/#installing-uv
# - https://uvicorn.dev/deployment/docker/#dockerfile_1

FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY --from=ghcr.io/astral-sh/uv:0.9.4 /uv /uvx /bin/
COPY pyproject.toml uv.lock README.md /app/
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project

# Copy source code
COPY src /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen

# Run the webserver
CMD ["uv", "run", "uvicorn", "src.cards_app_backend.core.api:app", "--host", "0.0.0.0", "--port", "8000"]