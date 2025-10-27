import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { ToggleGroup, ToggleGroupItem, ToggleGroupIcon } from "@/src/components/ui/toggle-group";
import { Grid2x2, List } from "lucide-react-native";
import CreateButton from "@/src/components/common/buttons/CreateButton";
import { useRouter } from "expo-router";

interface Props {
  cardStyle: "card" | "list";
  onCardStyleChange: (value: "card" | "list") => void;
}

export default function TemplateGalleryHeader({ cardStyle, onCardStyleChange }: Props) {
  const onValueChange = (value: string | undefined) => {
    if (value === "card" || value === "list") {
      onCardStyleChange(value as "card" | "list");
    }
  };

  const router = useRouter();

  function onCreateCardTemplate() {
    router.push("/template-gallery/create");
  }

  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl">Templates</Text>
      <View className="flex-row gap-2">
        <CreateButton onPress={onCreateCardTemplate} />
        <ToggleGroup
          value={cardStyle}
          onValueChange={onValueChange}
          variant="outline"
          type="single"
        >
          <ToggleGroupItem isFirst value="card">
            <ToggleGroupIcon as={Grid2x2} />
          </ToggleGroupItem>
          <ToggleGroupItem isLast value="list">
            <ToggleGroupIcon as={List} />
          </ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  );
}
