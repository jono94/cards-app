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
import { ColorSchemeOptionsArray, ColorSchemeOption, useSelectedTheme } from "@/src/lib/useTheme";

export default function ThemeSelector() {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const selectedThemeOption: Option =
    ColorSchemeOptionsArray.find((theme) => theme.value === selectedTheme) ??
    ColorSchemeOptionsArray[0];

  const handleValueChange = (option: Option) => {
    if (!option) return;
    setSelectedTheme(option.value as ColorSchemeOption);
  };

  return (
    <View className="flex-row items-center justify-between">
      <Text>Theme</Text>
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
