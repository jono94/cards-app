import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CardTemplateHeader from "@/src/components/TemplateGallery/CardTemplateHeader";
import CardTemplateContent from "@/src/components/TemplateGallery/CardTemplateContent";
import { DATA } from "@/src/api/CardTemplates/MockData";

export default function CardTemplateDetail() {
  const { cardTemplateId } = useLocalSearchParams();

  const cardTemplate = DATA.find((cardTemplate) => cardTemplate.uuid === cardTemplateId);

  // TODO: Add missing cardTemplate View

  return (
    <View className="p-4">
      <CardTemplateHeader cardTemplateName={cardTemplate?.name ?? ""} />
      <CardTemplateContent cardTemplate={cardTemplate ?? DATA[0]} />
    </View>
  );
}
