import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Image, SquarePen } from "lucide-react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { useState } from "react";
import * as ExpoImage from "expo-image";
import { useTranslation } from "react-i18next";

interface Props {
  onImagePicked: React.Dispatch<React.SetStateAction<ExpoImagePicker.ImagePickerAsset | null>>;
  initialImageUri?: string;
}
export default function ImagePicker({ onImagePicked, initialImageUri }: Props) {
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const displayImageUri = imageUri ?? initialImageUri;

  async function onPickImage() {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0]);
    }
  }

  return (
    <Card className="flex-1 justify-center items-center">
      {displayImageUri && (
        <>
          <ExpoImage.Image
            source={{ uri: displayImageUri }}
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full"
            contentFit="contain"
          />
          <Button variant="secondary" className="absolute top-2 right-2 z-10" onPress={onPickImage}>
            <Icon as={SquarePen} />
          </Button>
        </>
      )}
      {!displayImageUri && (
        <Button variant="secondary" onPress={onPickImage}>
          <Icon as={Image} />
          <Text>{t("templates.pickAnImage")}</Text>
        </Button>
      )}
    </Card>
  );
}
