import { View, ActivityIndicator } from "react-native";
import CardTemplateFormHeader from "@/src/components/TemplateGallery/CardTemplateFormHeader";
import CardTemplateForm from "@/src/components/TemplateGallery/CardTemplateForm";
import { useCardTemplateQueries } from "@/src/api/CardTemplates/queries";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text } from "@/src/components/ui/text";

export default function EditCardTemplate() {
  const { t } = useTranslation();
  const router = useRouter();

  const { cardTemplateId } = useLocalSearchParams();
  const {
    data: cardTemplate,
    isLoading,
    isError,
  } = useCardTemplateQueries().useGetCardTemplateQuery(cardTemplateId as string);

  const editCardTemplateMutation = useCardTemplateQueries().useUpdateCardTemplateMutation();

  function onEditCardTemplate(name: string, description: string, image?: File) {
    if (!cardTemplate) {
      throw new Error("Card template not found");
    }

    const updatedName = cardTemplate.name === name ? undefined : name;
    const updatedDescription = cardTemplate.description === description ? undefined : description;
    const updatedImage = image ? image : undefined;

    if (
      updatedName === undefined &&
      updatedDescription === undefined &&
      updatedImage === undefined
    ) {
      // No changes to update, so just go back to the detail page
      router.replace(`/template-gallery/${cardTemplate.uuid}`);
    } else {
      // Update the card template
      editCardTemplateMutation.mutate(
        {
          cardTemplateId: cardTemplate.uuid,
          name: updatedName,
          description: updatedDescription,
          image: updatedImage,
        },
        {
          onSuccess: (data) => {
            router.replace(`/template-gallery/${data.uuid}`);
          },
        },
      );
    }
  }

  return (
    <View className="flex-1 p-4">
      <CardTemplateFormHeader title={t("templates.editTemplate")} />
      {isLoading && (
        <View className="flex-1 p-4 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="mt-4">{t("common.loading")}</Text>
        </View>
      )}
      {isError && !cardTemplate && (
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-destructive">{t("templates.cardTemplateNotFound")}</Text>
        </View>
      )}
      {cardTemplate && (
        <CardTemplateForm
          onSubmit={onEditCardTemplate}
          submitting={editCardTemplateMutation.isPending}
          defaultName={cardTemplate.name}
          defaultDescription={cardTemplate.description}
          defaultImageUri={cardTemplate.imageUri}
        />
      )}
    </View>
  );
}
