import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent } from "@/src/components/ui/card";
import LikeBadge from "@/src/components/common/LikeBadge";
import CategoryBadge from "@/src/components/common/CategoryBadge";
import AuthorizedImage from "@/src/components/common/AuthorizedImage";
import { useRouter } from "expo-router";

interface Props {
  cardTemplates: CardTemplate[];
}

export default function TemplateGalleryListLayout({ cardTemplates }: Props) {
  const router = useRouter();

  return (
    <FlatList
      className="px-4"
      data={cardTemplates}
      renderItem={({ item }) => (
        <Card key={item.uuid} className="m-1">
          <CardContent className="flex-row justify-start items-stretch gap-2">
            <View className="w-1/3">
              <Pressable
                className="w-full aspect-square lg:aspect-video"
                onPress={() => router.push(`/template-gallery/${item.uuid}`)}
              >
                <AuthorizedImage
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: item.imageUri }}
                  contentFit="cover"
                />
              </Pressable>
            </View>

            <View className="flex-1 flex-col items-stretch justify-start gap-4 lg:gap-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg lg:text-2xl font-bold">{item.name}</Text>
                <LikeBadge likes={item.likes} size="sm" />
              </View>

              <Text className="text-xs lg:text-sm text-muted-foreground">{item.description}</Text>

              <View className="flex-row flex-wrap items-center gap-1">
                {item.categories.map((category) => (
                  <CategoryBadge key={category} category={category} />
                ))}
              </View>
            </View>
          </CardContent>
        </Card>
      )}
    />
  );
}
