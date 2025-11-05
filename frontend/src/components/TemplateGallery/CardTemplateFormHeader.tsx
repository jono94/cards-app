import { View } from "react-native";
import { Text } from "@/src/components/ui/text";

interface Props {
  title: string;
}

export default function CardTemplateFormHeader({ title }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-2xl">{title}</Text>
    </View>
  );
}
