import { View } from "react-native";
import CardTemplateCreateHeader from "@/src/components/TemplateGallery/CardTemplateCreateHeader";
import CardTemplateCreateForm from "@/src/components/TemplateGallery/CardTemplateCreateForm";

export default function CreateCardTemplate() {
  return (
    <View className="flex-1 p-4">
      <CardTemplateCreateHeader />
      <CardTemplateCreateForm />
    </View>
  );
}
