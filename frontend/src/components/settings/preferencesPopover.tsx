import { View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover";
import { Text } from "@/src/components/ui/text";
import ThemeSelector from "@/src/components/settings/themeSelector";
import LanguageSelector from "@/src/components/settings/languageSelector";
import { useTranslation } from "react-i18next";

export default function PreferencesPopover() {
  const { t } = useTranslation();
  return (
    <View>
      <Popover>
        <PopoverTrigger>
          <EvilIcons name="gear" size={32} className="text-foreground" />
        </PopoverTrigger>
        <PopoverContent>
          <View className="flex-col gap-2">
            <Text className="font-bold">{t("settings.preferences")}</Text>
            <ThemeSelector />
            <LanguageSelector />
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}
