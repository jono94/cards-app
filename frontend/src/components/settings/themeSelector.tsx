import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  type Option,
} from "@/src/components/ui/select";
import { ColorSchemeOption, useSelectedTheme } from "@/src/lib/useTheme";
import { useTranslation } from "react-i18next";

export default function ThemeSelector() {
  const { t } = useTranslation();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const ColorSchemeOptionsArray = [
    { value: "light", label: t("settings.themeLight") },
    { value: "dark", label: t("settings.themeDark") },
    { value: "system", label: t("settings.themeSystem") },
  ];

  const selectedThemeOption: Option =
    ColorSchemeOptionsArray.find((theme) => theme.value === selectedTheme) ??
    ColorSchemeOptionsArray[0];

  const handleValueChange = (option: Option) => {
    if (!option) return;
    setSelectedTheme(option.value as ColorSchemeOption);
  };

  return (
    <View className="flex-row items-center justify-between">
      <Text>{t("settings.theme")}</Text>
      <Select value={selectedThemeOption} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {ColorSchemeOptionsArray.map((theme) => (
            <SelectItem key={theme.value} value={theme.value} label={theme.label}>
              {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}
