import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CardTemplateHeader from "@/src/components/TemplateGallery/CardTemplateHeader";
import CardTemplateContent from "@/src/components/TemplateGallery/CardTemplateContent";
import { useCardTemplateQueries } from "@/src/api/CardTemplates/queries";

export default function CardTemplateDetail() {
  const router = useRouter();
  const deleteCardTemplateMutation = useCardTemplateQueries().useDeleteCardTemplateMutation();

  const { cardTemplateId } = useLocalSearchParams();
  const { data: cardTemplate } = useCardTemplateQueries().useGetCardTemplateQuery(
    cardTemplateId as string,
  );

  function onEditCardTemplate() {
    router.push(`/template-gallery/${cardTemplateId}/edit`);
  }

  function onDeleteCardTemplate() {
    // TODO: Add confirmation dialog
    deleteCardTemplateMutation.mutate(cardTemplateId as string, {
      onSuccess: () => {
        router.replace("/template-gallery");
      },
    });
  }

  // TODO: Add missing/loading cardTemplate View

  return (
    <View className="flex-1 p-4 items-stretch">
      <CardTemplateHeader
        cardTemplateName={cardTemplate?.name ?? ""}
        onEditCardTemplate={onEditCardTemplate}
        onDeleteCardTemplate={onDeleteCardTemplate}
      />
      {cardTemplate && <CardTemplateContent cardTemplate={cardTemplate} />}
    </View>
  );
}
