import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { Pressable, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Image } from "expo-image";
import EvilIcons from "@expo/vector-icons/EvilIcons";
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
          <Pressable onPress={() => router.push(`/template-gallery/${cardTemplate.uuid}`)}>
            <Card className="flex-1 m-1">
              <CardContent className="aspect-video">
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: cardTemplate.imageUri }}
                  contentFit="cover"
                />
              </CardContent>

              <CardFooter className="flex-col gap-2 items-stretch">
                <View className="flex-row items-center justify-between gap-4">
                  <Text>{cardTemplate.name}</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-xs">{cardTemplate.likes}</Text>
                    <EvilIcons name="like" size={24} color="black" />
                  </View>
                </View>

                <Text className="text-xs">{cardTemplate.description}</Text>

                <View className="flex-row flex-wrap items-center gap-1">
                  {cardTemplate.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      <Text>{category}</Text>
                    </Badge>
                  ))}
                </View>
              </CardFooter>
            </Card>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
