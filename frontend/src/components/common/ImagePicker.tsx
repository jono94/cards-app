import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Image, Trash2 } from "lucide-react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { useState } from "react";
import * as ExpoImage from "expo-image";

interface Props {
  onImagePicked: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function ImagePicker({ onImagePicked }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function onPickImage() {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  }

  async function onRemoveImage() {
    setImageUri(null);
    onImagePicked(null);
  }

  return (
    <Card className="flex-1 justify-center items-center">
      {imageUri && (
        <>
          <ExpoImage.Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full"
            contentFit="contain"
          />
          <Button
            variant="secondary"
            className="absolute top-2 right-2 z-10"
            onPress={onRemoveImage}
          >
            <Icon as={Trash2} />
          </Button>
        </>
      )}
      {!imageUri && (
        <Button variant="secondary" onPress={onPickImage}>
          <Icon as={Image} />
          <Text>Pick an image</Text>
        </Button>
      )}
    </Card>
  );
}
