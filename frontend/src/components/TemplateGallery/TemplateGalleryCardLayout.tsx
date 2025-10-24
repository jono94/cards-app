import { type CardTemplate } from "@/src/api/CardTemplates/api";
import { useWindowDimensions, View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Image } from "expo-image";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface Props {
  cardTemplates: CardTemplate[];
}

export default function TemplateGalleryCardLayout({ cardTemplates }: Props) {
  const { width } = useWindowDimensions();

  const maxItemsPerRow = 3; // TODO: Make this dynamic based on the screen width

  const containerPadding = 16;
  const cardMargin = 4 * 2;
  const cardWidth = (width - containerPadding - cardMargin * (maxItemsPerRow - 1)) / maxItemsPerRow;
  return (
    <View className="flex-row flex-wrap justify-start p-1">
      {cardTemplates.map((cardTemplate) => (
        <Card key={cardTemplate.uuid} className="h-full m-1" style={{ width: cardWidth }}>
          <CardContent className="flex-1">
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
      ))}
    </View>
  );
}
