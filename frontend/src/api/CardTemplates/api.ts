export interface CardTemplate {
  uuid: string;
  categories: string[];
  name: string;
  description: string;
  imageUri: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
