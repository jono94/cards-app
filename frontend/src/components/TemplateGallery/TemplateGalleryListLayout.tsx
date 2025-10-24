import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { FlatList, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Image } from "expo-image";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface Props {
  cardTemplates: CardTemplate[];
}

export default function TemplateGalleryListLayout({ cardTemplates }: Props) {
  return (
    <FlatList
      className="px-4"
      data={cardTemplates}
      renderItem={({ item }) => (
        <Card key={item.uuid} className="m-1">
          <CardContent className="flex-row justify-start items-stretch gap-4">
            <View className="w-1/3 aspect-video">
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{ uri: item.imageUri }}
                contentFit="cover"
              />
            </View>

            <View className="flex-1 flex-col items-stretch justify-between">
              <View className="flex-row items-center justify-between gap-16">
                <Text className="text-3xl font-bold">{item.name}</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-xl">{item.likes}</Text>
                  <EvilIcons name="like" size={32} color="black" />
                </View>
              </View>

              <Text className="text-xl">{item.description}</Text>

              <View className="flex-row flex-wrap items-center gap-1">
                {item.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    <Text className="text-lg">{category}</Text>
                  </Badge>
                ))}
              </View>
            </View>
          </CardContent>
        </Card>
      )}
    />
  );
}
