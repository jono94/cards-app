import { View } from "react-native";
import { Link, useSegments } from "expo-router";
import { Text } from "@/src/components/ui/text";
import { useTranslation } from "react-i18next";
import SettingsPopover from "@/src/components/settings/settingsPopover";
import { Separator } from "@/src/components/ui/separator";

export default function WebNav() {
  const { t } = useTranslation();

  // Returns the full path as an array, ["(tabs)", "template-gallery", "<id>", ...]
  const pathSegments = useSegments();
  const pathname = `/${pathSegments[1]}`;

  const navItems = [
    {
      label: t("navigation.home"),
      href: "/home" as "/home",
    },
    {
      label: t("navigation.receivedCards"),
      href: "/received-cards" as "/received-cards",
    },
    {
      label: t("navigation.cardCreator"),
      href: "/card-creator" as "/card-creator",
    },
    {
      label: t("navigation.templateGallery"),
      href: "/template-gallery" as "/template-gallery",
    },
  ];

  return (
    <View className="flex-row justify-between items-center py-2 px-4 border-b border-muted-foreground/50">
      <View>
        <Text>LOGO</Text>
      </View>
      <View className="flex-row items-center">
        {navItems.map((item, index) => (
          <View key={item.href} className="flex-row items-center">
            {index !== 0 && (
              <Separator orientation="vertical" className="h-5 bg-muted-foreground/50 mx-4" />
            )}
            <Link
              className={pathname === item.href ? "border-b-2 border-foreground" : "pb-0.5"}
              href={item.href}
            >
              <Text>{item.label}</Text>
            </Link>
          </View>
        ))}
      </View>
      <SettingsPopover />
    </View>
  );
}
