import { View, Pressable } from "react-native";
import { Icon } from "@/src/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => router.back()}>
      <View className="flex-row justify-start items-center px-2 pt-2 gap-2">
        <Icon as={ArrowLeft} size={18} />
        <Text className="text-lg">{t("common:back")}</Text>
      </View>
    </Pressable>
  );
}
