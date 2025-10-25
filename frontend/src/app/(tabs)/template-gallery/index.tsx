import TemplateGalleryHeader from "@/src/components/TemplateGallery/TemplateGalleryHeader";
import TemplateGalleryCardLayout from "@/src/components/TemplateGallery/TemplateGalleryCardLayout";
import TemplateGalleryListLayout from "@/src/components/TemplateGallery/TemplateGalleryListLayout";
import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { useState } from "react";

const DATA: CardTemplate[] = [
  {
    uuid: "template-1",
    categories: ["category-1", "category-2"],
    name: "Template 1",
    description: "Template 1 description",
    imageUri: "https://www.kasandbox.org/programming-images/avatars/leaf-blue.png",
    likes: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: "template-2",
    categories: ["category-1", "category-2"],
    name: "Template 2",
    description: "Template 2 description",
    imageUri: "https://www.kasandbox.org/programming-images/avatars/leaf-green.png",
    likes: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: "template-3",
    categories: ["category-3", "category-4"],
    name: "Template 3",
    description: "Template 3 description",
    imageUri: "https://www.kasandbox.org/programming-images/avatars/leaf-red.png",
    likes: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: "template-4",
    categories: ["category-5", "category-6"],
    name: "Template 4",
    description: "Template 4 description",
    imageUri: "https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png",
    likes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: "template-5",
    categories: ["category-7", "category-8"],
    name: "Template 5",
    description: "Template 5 description",
    imageUri: "https://www.kasandbox.org/programming-images/avatars/leaf-orange.png",
    likes: 2222,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CardTemplates() {
  const [cardStyle, setCardStyle] = useState<"card" | "list">("card");

  return (
    <>
      <TemplateGalleryHeader cardStyle={cardStyle} onCardStyleChange={setCardStyle} />
      {cardStyle === "card" ? (
        <TemplateGalleryCardLayout cardTemplates={DATA} />
      ) : (
        <TemplateGalleryListLayout cardTemplates={DATA} />
      )}
    </>
  );
}
