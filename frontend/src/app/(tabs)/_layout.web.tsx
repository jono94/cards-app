import { View } from "react-native";
import { Slot, useSegments } from "expo-router";
import WebNav from "@/src/components/navigation/web-nav";
import BackButton from "@/src/components/navigation/back-button";

// Ensure deep links push the "index.tsx" route onto the stack first
export const unstable_settings = {
  initialRouteName: "index",
};

export default function WebLayout() {
  // TODO: Create a small WebNav as well with a hamburger menu and a logo
  // for when the screen is too small to display the WebNav (e.g on mobile)

  // Relies on the path structure to determine if the user can go back
  // Expects ["(tabs)", "template-gallery", "<id>", ...]
  const pathSegments = useSegments();
  const canGoBack = pathSegments.length > 2;

  return (
    <View>
      <WebNav />
      {canGoBack && <BackButton />}
      <Slot />
    </View>
  );
}
