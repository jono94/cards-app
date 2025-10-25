import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import EditButton from "@/src/components/common/EditButton";

interface Props {
  cardTemplateName: string;
}

export default function CardTemplateHeader({ cardTemplateName }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl">{cardTemplateName}</Text>
      <EditButton size="lg" />
    </View>
  );
}
