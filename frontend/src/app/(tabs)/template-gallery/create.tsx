import { View } from "react-native";
import CardTemplateFormHeader from "@/src/components/TemplateGallery/CardTemplateFormHeader";
import CardTemplateForm from "@/src/components/TemplateGallery/CardTemplateForm";
import { useCardTemplateQueries } from "@/src/api/CardTemplates/queries";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function CreateCardTemplate() {
  const { t } = useTranslation();
  const router = useRouter();
  const createCardTemplateMutation = useCardTemplateQueries().useCreateCardTemplateMutation();

  function onCreateCardTemplate(name: string, description: string, image?: File) {
    if (!image) {
      throw new Error("Image is required");
    }
    createCardTemplateMutation.mutate(
      { name, description, image },
      {
        onSuccess: (data) => {
          router.replace(`/template-gallery/${data.uuid}`);
        },
      },
    );
  }

  return (
    <View className="flex-1 p-4">
      <CardTemplateFormHeader title={t("templates.newTemplate")} />
      <CardTemplateForm
        onSubmit={onCreateCardTemplate}
        submitting={createCardTemplateMutation.isPending}
      />
    </View>
  );
}
