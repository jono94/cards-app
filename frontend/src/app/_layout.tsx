import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { loadSelectedTheme, useSelectedTheme } from "@/src/lib/useTheme";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Load the theme on mount
    loadSelectedTheme().then(() => {
      setIsThemeLoaded(true);
    });
  }, []);

  // Don't render until theme is loaded to prevent flash
  if (!isThemeLoaded) {
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
