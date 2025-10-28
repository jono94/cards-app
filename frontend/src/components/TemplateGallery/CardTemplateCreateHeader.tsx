import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { useTranslation } from "react-i18next";

export default function CardTemplateCreateHeader() {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-2xl">{t("templates.newTemplate")}</Text>
    </View>
  );
}
