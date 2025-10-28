import { View } from "react-native";
import ImagePicker from "@/src/components/common/ImagePicker";
import { Input } from "@/src/components/ui/input";
import { Text } from "@/src/components/ui/text";
import { Textarea } from "@/src/components/ui/textarea";
import SaveButton from "@/src/components/common/buttons/SaveButton";
import CancelButton from "@/src/components/common/buttons/CancelButton";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

type Inputs = {
  name: string;
  description: string;
  imageUri: string | null;
};

export default function CardTemplateCreateForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
      imageUri: null,
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log(data);
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
          name="imageUri"
          rules={{
            required: t("templates.cardTemplateImageRequired"),
          }}
          render={({ field: { onChange, value } }) => (
            <View className="w-full max-w-96 self-center aspect-video">
              <ImagePicker onImagePicked={onChange} />
            </View>
          )}
        />
        {errors.imageUri && (
          <Text className="text-destructive text-sm pl-2">* {errors.imageUri.message}</Text>
        )}

        {/* Buttons */}
        <View className="flex-row justify-end gap-4">
          <CancelButton onPress={onCancel} />
          <SaveButton onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}
