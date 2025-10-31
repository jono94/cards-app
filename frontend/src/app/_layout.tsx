import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { loadSelectedTheme, useSelectedTheme } from "@/src/lib/useTheme";
import "@/src/lib/i18n";
import { loadLanguage } from "@/src/lib/i18n/useLanguage";

let initialised = false;

export default function RootLayout() {
  if (!initialised) {
    // Load language
    loadLanguage();

    // Load theme
    loadSelectedTheme();

    initialised = true;
  }

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

  const { colorScheme } = useSelectedTheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme as "light" | "dark"]}>
      {children}
      <PortalHost />
    </ThemeProvider>
  );
}
