import { View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover";
import ThemeSelector from "@/src/components/settings/themeSelector";

export default function SettingsPopover() {
  return (
    <View className="p-4">
      <Popover>
        <PopoverTrigger>
          <EvilIcons name="user" size={32} className="text-foreground" />
        </PopoverTrigger>
        <PopoverContent>
          <ThemeSelector />
        </PopoverContent>
      </Popover>
    </View>
  );
}
