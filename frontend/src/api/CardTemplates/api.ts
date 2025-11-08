import { api } from "@/src/api/api";

/*
 * Card Template API
 */
export interface CardTemplate {
  uuid: string;
  categories: string[];
  name: string;
  description: string;
  imageFileName: string;
  imageUri: string; // Injected for convenience based on the backend API URL
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CardTemplateDTO {
  uuid: string;
  categories: string[];
  name: string;
  description: string;
  image_file_name: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

function toCardTemplate(dto: CardTemplateDTO): CardTemplate {
  let baseUrl: string;
  if (api.defaults.baseURL?.endsWith("/")) {
    baseUrl = api.defaults.baseURL.slice(0, -1);
  } else {
    baseUrl = api.defaults.baseURL ?? "";
  }
  return {
    uuid: dto.uuid,
    categories: dto.categories,
    name: dto.name,
    description: dto.description,
    imageFileName: dto.image_file_name,
    imageUri: `${baseUrl}/v1/template-gallery/images/${dto.image_file_name}`,
    likes: dto.likes,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),
  };
}

/*
 * Card Template Mutations
 */
export interface CreateCardTemplateData {
  name: string;
  description: string;
  image: File;
  categories?: string[];
}

export interface UpdateCardTemplateData {
  cardTemplateId: string;
  name?: string;
  description?: string;
  categories?: string[];
  image?: File;
}

/*
 * Card Template API
 */
export const cardTemplatesApi = {
  /// LIST
  listCardTemplates: async () => {
    const response = await api.get<CardTemplateDTO[]>("/v1/template-gallery/");
    return response.data.map(toCardTemplate);
  },

  /// GET
  getCardTemplate: async (cardTemplateId: string) => {
    const response = await api.get<CardTemplateDTO>(`/v1/template-gallery/${cardTemplateId}`);
    return toCardTemplate(response.data);
  },

  /// CREATE
  createCardTemplate: async (data: CreateCardTemplateData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.categories) {
      data.categories.forEach((category) => {
        formData.append("categories", category);
      });
    }
    formData.append("image", data.image);

    const response = await api.post<CardTemplateDTO>("/v1/template-gallery/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return toCardTemplate(response.data);
  },

  /// UPDATE
  updateCardTemplate: async (data: UpdateCardTemplateData) => {
    if (!data.name && !data.description && !data.categories && !data.image) {
      throw new Error("No data to update");
    }

    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.categories) {
      data.categories.forEach((category) => {
        formData.append("categories", category);
      });
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.put<CardTemplateDTO>(
      `/v1/template-gallery/${data.cardTemplateId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return toCardTemplate(response.data);
  },

  /// DELETE
  deleteCardTemplate: async (cardTemplateId: string) => {
    await api.delete<void>(`/v1/template-gallery/${cardTemplateId}`);
  },
};
