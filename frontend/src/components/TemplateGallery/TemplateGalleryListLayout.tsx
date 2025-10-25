import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent } from "@/src/components/ui/card";
import LikeBadge from "@/src/components/common/LikeBadge";
import CategoryBadge from "@/src/components/common/CategoryBadge";
import { Image } from "expo-image";
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
          <CardContent className="flex-row justify-start items-stretch gap-4">
            <View className="w-1/3 aspect-video">
              <Pressable
                className="w-full h-full"
                onPress={() => router.push(`/template-gallery/${item.uuid}`)}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: item.imageUri }}
                  contentFit="cover"
                />
              </Pressable>
            </View>

            <View className="flex-1 flex-col items-stretch justify-between">
              <View className="flex-row items-center justify-between gap-16">
                <Text className="text-3xl font-bold">{item.name}</Text>
                <LikeBadge likes={item.likes} />
              </View>

              <Text className="text-xl">{item.description}</Text>

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
