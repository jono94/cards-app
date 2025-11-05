import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import EditButton from "@/src/components/common/buttons/EditButton";
import DeleteButton from "@/src/components/common/buttons/DeleteButton";
interface Props {
  cardTemplateName: string;
  onEditCardTemplate?: () => void;
  onDeleteCardTemplate?: () => void;
}

export default function CardTemplateHeader({
  cardTemplateName,
  onEditCardTemplate,
  onDeleteCardTemplate,
}: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl">{cardTemplateName}</Text>
      <View className="flex-row gap-2">
        {onEditCardTemplate && <EditButton size="lg" onPress={onEditCardTemplate} />}
        {onDeleteCardTemplate && <DeleteButton size="lg" onPress={onDeleteCardTemplate} />}
      </View>
    </View>
  );
}
