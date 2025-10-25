import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { useLocalSearchParams } from "expo-router";

export default function CardTemplateDetail() {
  const { cardTemplateId } = useLocalSearchParams();
  return (
    <View>
      <Text>Card Template Detail - {cardTemplateId}</Text>
    </View>
  );
}
