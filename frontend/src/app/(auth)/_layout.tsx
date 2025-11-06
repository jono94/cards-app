import { Stack } from "expo-router";
import { appName } from "@/src/lib/i18n/resources";
import PreferencesPopover from "@/src/components/settings/preferencesPopover";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        title: appName,
        headerRight: () => {
          return (
            <View className="pr-4">
              <PreferencesPopover />
            </View>
          );
        },
      }}
    />
  );
}
