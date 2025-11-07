import { View, Platform } from "react-native";
import ImagePicker from "@/src/components/common/ImagePicker";
import { Input } from "@/src/components/ui/input";
import { Text } from "@/src/components/ui/text";
import { Textarea } from "@/src/components/ui/textarea";
import SaveButton from "@/src/components/common/buttons/SaveButton";
import CancelButton from "@/src/components/common/buttons/CancelButton";
import * as ExpoImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Supports creating and editing card templates.
// When creating a new template, the defaultName, defaultDescription and defaultImageUri should not be provided.
// When editing a template, the defaultName, defaultDescription and defaultImageUri should be provided.
// The onSubmit function is called with the name, description and image (if any) to create or update the card template.
// It is expected that if we are editing and a defaultImageUri is provided, then the onSubmit callback should not expect
// an image file to be passed unless the user has changed the image. The name and description will always be passed.

interface Props {
  onSubmit: (name: string, description: string, image?: File) => void;
  submitting: boolean;
  defaultName?: string;
  defaultDescription?: string;
  defaultImageUri?: string;
}

type Inputs = {
  name: string;
  description: string;
  image?: ExpoImagePicker.ImagePickerAsset;
};

export default function CardTemplateCreateForm({
  onSubmit,
  submitting,
  defaultName,
  defaultDescription,
  defaultImageUri,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: defaultName ?? "",
      description: defaultDescription ?? "",
      image: undefined,
    },
  });

  const onSubmitInternal = (data: Inputs) => {
    let imageFile: File | undefined = undefined;

    if (data.image) {
      // https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickerasset
      if (Platform.OS === "web") {
        // On web, the image asset has a 'file' property
        imageFile = data.image.file;
      } else {
        // On mobile, we need to create a File-like object from the URI
        // React Native's FormData accepts objects with { uri, type, name }
        const fileName = data.image.fileName || `photo_${Date.now()}.jpg`;
        const fileType = data.image.mimeType || "image/jpeg";

        // Not sure where this structure comes from, but its online in many places.
        // Also note that if I explicity pass this type to the FormData.append() method,
        // it complains about the type, so this is cast as a File for TypeScript. This
        // works, but I an not 100% sure if it is the correct way to do this.
        imageFile = {
          uri: data.image.uri,
          type: fileType,
          name: fileName,
        } as any as File; // Cast as File for TypeScript, but it's actually the RN format
      }
    }

    onSubmit(data.name, data.description, imageFile);
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <View className="flex-row justify-center">
      <View className="flex-col gap-2 items-stretch w-full max-w-96">
        {/* Name */}
        <Controller
          control={control}
          name="name"
          rules={{
            required: t("templates.cardTemplateNameRequired"),
            minLength: {
              value: 3,
              message: t("templates.cardTemplateNameMinLength", { minLength: 3 }),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-full max-w-96"
              onBlur={onBlur}
              placeholder={t("templates.cardTemplateNamePlaceholder")}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text className="text-destructive text-sm pl-2">* {errors.name.message}</Text>
        )}

        {/* Description */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              className="w-full max-w-96"
              onChangeText={onChange}
              value={value}
              placeholder={t("templates.cardTemplateDescriptionPlaceholder")}
            />
          )}
        />

        {/* Image */}
        <Controller
          control={control}
          name="image"
          rules={{
            // When we are editing we only have access to the defaultImageUri so cannot
            // assign it directly as a default for the image file. So we only make this
            // mandatory if we are creating a new template (ie. there is no default image uri).
            required: defaultImageUri ? false : t("templates.cardTemplateImageRequired"),
          }}
          render={({ field: { onChange, value } }) => (
            <View className="w-full max-w-96 self-center aspect-video">
              <ImagePicker onImagePicked={onChange} initialImageUri={defaultImageUri} />
            </View>
          )}
        />
        {errors.image && (
          <Text className="text-destructive text-sm pl-2">* {errors.image.message}</Text>
        )}

        {/* Buttons */}
        <View className="flex-row justify-end gap-4">
          <CancelButton onPress={onCancel} disabled={submitting} />
          <SaveButton onPress={handleSubmit(onSubmitInternal)} disabled={submitting} />
        </View>
      </View>
    </View>
  );
}
