import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t("navigation.home"),
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="received-cards"
        options={{
          title: t("navigation.receivedCards"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email-open-heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="card-creator"
        options={{
          title: t("navigation.cardCreator"),
          tabBarIcon: ({ color, size }) => <Entypo name="new-message" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="template-gallery"
        options={{
          title: t("navigation.templateGallery"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="palette" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
