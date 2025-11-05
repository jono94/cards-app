import { View } from "react-native";
import TemplateGalleryHeader from "@/src/components/TemplateGallery/TemplateGalleryHeader";
import TemplateGalleryCardLayout from "@/src/components/TemplateGallery/TemplateGalleryCardLayout";
import TemplateGalleryListLayout from "@/src/components/TemplateGallery/TemplateGalleryListLayout";
import { useState } from "react";
import { useCardTemplateQueries } from "@/src/api/CardTemplates/queries";

export default function CardTemplates() {
  const [cardStyle, setCardStyle] = useState<"card" | "list">("card");

  const { data: cardTemplates } = useCardTemplateQueries().useListCardTemplatesQuery();

  const cardTemplatesList = cardTemplates ?? [];

  return (
    <View className="flex-1 p-4">
      <TemplateGalleryHeader cardStyle={cardStyle} onCardStyleChange={setCardStyle} />
      {cardStyle === "card" ? (
        <TemplateGalleryCardLayout cardTemplates={cardTemplatesList} />
      ) : (
        <TemplateGalleryListLayout cardTemplates={cardTemplatesList} />
      )}
    </View>
  );
}
