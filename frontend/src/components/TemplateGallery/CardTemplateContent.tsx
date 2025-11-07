import { View } from "react-native";
import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { Text } from "@/src/components/ui/text";
import LikeBadge from "@/src/components/common/LikeBadge";
import CategoryBadge from "@/src/components/common/CategoryBadge";
import AuthorizedImage from "@/src/components/common/AuthorizedImage";

interface Props {
  cardTemplate: CardTemplate;
}

export default function CardTemplateContent({ cardTemplate }: Props) {
  return (
    <View className="flex-col p-8 items-stretch gap-4 w-full max-w-[840px] self-center">
      <View className="aspect-square max-h-[840px]">
        <AuthorizedImage
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          source={{ uri: cardTemplate.imageUri }}
        />
      </View>
      <View className="flex-row justify-between">
        <LikeBadge likes={cardTemplate.likes} size="lg" />
        <View className="flex-row gap-2">
          {cardTemplate.categories.map((category) => (
            <CategoryBadge key={category} category={category} size="lg" />
          ))}
        </View>
      </View>

      <Text className="text-lg text-muted-foreground p-4">{cardTemplate.description}</Text>
    </View>
  );
}
