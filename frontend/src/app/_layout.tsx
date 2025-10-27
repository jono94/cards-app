import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { useTheme } from "@/src/lib/useTheme";

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  /// ThemeProvider sets the theme for the app navigation (tabs, etc.)
  /// PortalHost is required for certain components that need to be rendered outside of the main app component (apparently it should be last)

  let { colorScheme } = useTheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme as "light" | "dark"]}>
      {children}
      <PortalHost />
    </ThemeProvider>
  );
}
