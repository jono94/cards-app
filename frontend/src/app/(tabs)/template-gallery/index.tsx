import { View } from "react-native";
import TemplateGalleryHeader from "@/src/components/TemplateGallery/TemplateGalleryHeader";
import TemplateGalleryCardLayout from "@/src/components/TemplateGallery/TemplateGalleryCardLayout";
import TemplateGalleryListLayout from "@/src/components/TemplateGallery/TemplateGalleryListLayout";
import { useState } from "react";
import { DATA } from "@/src/api/CardTemplates/MockData";

export default function CardTemplates() {
  const [cardStyle, setCardStyle] = useState<"card" | "list">("card");

  return (
    <View className="flex-1 p-4">
      <TemplateGalleryHeader cardStyle={cardStyle} onCardStyleChange={setCardStyle} />
      {cardStyle === "card" ? (
        <TemplateGalleryCardLayout cardTemplates={DATA} />
      ) : (
        <TemplateGalleryListLayout cardTemplates={DATA} />
      )}
    </View>
  );
}
