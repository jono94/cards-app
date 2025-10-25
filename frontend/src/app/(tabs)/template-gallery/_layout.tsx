import { Stack } from "expo-router";

// Ensure deep links push the "index.tsx" route onto the stack first
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TemplateGalleryLayout() {
  return <Stack screenOptions={{ headerTitle: "Template Gallery" }} />;
}
