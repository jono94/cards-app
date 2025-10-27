import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface Props {
  likes: number;
  size?: "sm" | "md" | "lg";
}
export default function LikeBadge({ likes, size = "md" }: Props) {
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  const iconSize = {
    sm: 24,
    md: 30,
    lg: 36,
  };

  return (
    <View className="flex-row items-center gap-1 border-border border rounded-md px-2 py-0.25">
      <Text className={textSize[size]}>{likes}</Text>
      <EvilIcons name="like" size={iconSize[size]} className="text-foreground" />
    </View>
  );
}
