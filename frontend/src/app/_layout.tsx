import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { loadSelectedTheme, useSelectedTheme } from "@/src/lib/useTheme";
import { useEffect, useState } from "react";
import "@/src/lib/i18n";
import { loadLanguage } from "@/src/lib/i18n/useLanguage";

export default function RootLayout() {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    // Load the theme and language on mount
    loadSelectedTheme()
      .then(() => {
        setIsThemeLoaded(true);
      })
      .then(() => {
        loadLanguage().then(() => {
          setIsLanguageLoaded(true);
        });
      });
  }, []);

  // Don't render until theme is loaded to prevent flash
  if (!isThemeLoaded || !isLanguageLoaded) {
    return null;
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
