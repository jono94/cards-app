import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import CardTemplateCreateForm from "@/src/components/TemplateGallery/CardTemplateCreateForm";

export default function CreateCardTemplate() {
  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl">New Card Template</Text>
      </View>
      <CardTemplateCreateForm />
    </View>
  );
}
