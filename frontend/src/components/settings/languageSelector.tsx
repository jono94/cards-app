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
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/src/lib/i18n/useLanguage";
import { resources } from "@/src/lib/i18n/resources";

export default function LanguageSelector() {
  const { t } = useTranslation();

  // Language hook and options
  const { language, setLanguage } = useLanguage();
  const languageOptions = Object.keys(resources).map((key) => ({
    label: t(`settings.languages.${key}`),
    value: key,
  }));

  // Internal mappings to the Options API for the Select component
  const selectedLanguageOption: Option =
    languageOptions.find((option) => option.value === language) ?? languageOptions[0];

  const handleValueChange = (option: Option) => {
    if (!option) return;
    setLanguage(option.value as string);
  };

  return (
    <View className="flex-row items-center justify-between">
      <Text>{t("common:language")}</Text>
      <Select value={selectedLanguageOption} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((language) => (
            <SelectItem key={language.value} value={language.value} label={language.label}>
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}
