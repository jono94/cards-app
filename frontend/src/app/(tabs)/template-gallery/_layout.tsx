import { Stack } from "expo-router";
import SettingsPopover from "@/src/components/settings/settingsPopover";
import { useTranslation } from "react-i18next";

// Ensure deep links push the "index.tsx" route onto the stack first
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TemplateGalleryLayout() {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerTitle: t("navigation.templateGallery"),
        headerRight: () => <SettingsPopover />,
      }}
    />
  );
}
