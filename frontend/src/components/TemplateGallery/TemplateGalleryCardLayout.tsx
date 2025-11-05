import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { Pressable, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import CategoryBadge from "@/src/components/common/CategoryBadge";
import LikeBadge from "@/src/components/common/LikeBadge";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface Props {
  cardTemplates: CardTemplate[];
}

export default function TemplateGalleryCardLayout({ cardTemplates }: Props) {
  const router = useRouter();

  return (
    <View className="flex-row flex-wrap justify-start p-1">
      {cardTemplates.map((cardTemplate) => (
        <View key={cardTemplate.uuid} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Card className="m-1 h-[95%]">
            <CardContent className="p-0">
              <Pressable
                className="w-full aspect-video"
                onPress={() => router.push(`/template-gallery/${cardTemplate.uuid}`)}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: cardTemplate.imageUri }}
                  contentFit="cover"
                />
              </Pressable>
            </CardContent>

            <CardFooter className="flex-col gap-2 items-stretch">
              <View className="flex-row items-center justify-between gap-4">
                <Text>{cardTemplate.name}</Text>
                <LikeBadge likes={cardTemplate.likes} size="sm" />
              </View>

              <Text className="text-xs text-muted-foreground">{cardTemplate.description}</Text>

              <View className="flex-row flex-wrap items-center gap-1">
                {cardTemplate.categories.map((category) => (
                  <CategoryBadge key={category} category={category} size="sm" />
                ))}
              </View>
            </CardFooter>
          </Card>
        </View>
      ))}
    </View>
  );
}
