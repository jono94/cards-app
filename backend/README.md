
## Setup

1. Configure the `.env` file

  ```bash
  # Repository Settings
  REPOSITORY_TYPE="in_memory"
  INITIAL_IN_MEMORY_DATA_FILE="data/initial_in_memory_data.json"
  INITIAL_IN_MEMORY_IMAGE_FILES_DIRECTORY="data/initial_in_memory_images"
  IMAGE_BASE_URL="http://10.0.0.88:8000/api/v1/template-gallery/images/"
  ```

2. Install the dependencies

  ```bash
  uv sync
  ```

3. Run the webserver

  ```bash
  uv run uvicorn src.cards_app_backend.core.api:app --host 0.0.0.0
  ```