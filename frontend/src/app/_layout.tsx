import "../styles/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { loadSelectedTheme, useSelectedTheme } from "@/src/lib/useTheme";
import "@/src/lib/i18n";
import { loadLanguage } from "@/src/lib/i18n/useLanguage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthenticationProvider } from "@/src/lib/authentication/AuthenticationProvider";

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
  // ThemeProvider sets the theme for the app navigation (tabs, etc.)
  // Get the color scheme from the selected theme
  const { colorScheme } = useSelectedTheme();

  // QueryClient is used to fetch data from the API
  const queryClient = new QueryClient();

  // PortalHost is required for certain components that need to be rendered outside of the main app component (apparently it should be last)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme as "light" | "dark"]}>
        <AuthenticationProvider>{children}</AuthenticationProvider>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
