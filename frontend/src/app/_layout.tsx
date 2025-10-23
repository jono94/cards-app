import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </>
  );
}
