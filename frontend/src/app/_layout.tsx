import "../styles/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "@/src/lib/nativeWindEnablement";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/src/lib/theme";
import { loadSelectedTheme, useSelectedTheme } from "@/src/lib/useTheme";
import "@/src/lib/i18n";
import { loadLanguage } from "@/src/lib/i18n/useLanguage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AuthenticationProvider,
  useAuthentication,
} from "@/src/lib/authentication/AuthenticationProvider";
import { useState, useEffect } from "react";

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
      <RootNavigation />
    </Providers>
  );
}

function RootNavigation() {
  const { loading, loggedInVerifiedEmail, emailVerifying, loggedOut } = useAuthentication();
  const segments = useSegments();
  const router = useRouter();

  // Handle navigation based on auth state - this is the ONLY place navigation happens
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (loggedInVerifiedEmail) {
      // User is logged in and verified - should be in main app
      if (inAuthGroup) {
        router.replace("/");
      }
    } else if (emailVerifying) {
      // User needs to verify email
      const inVerifyEmail = segments[1] === "verify-email";
      if (!inVerifyEmail) {
        router.replace("/verify-email");
      }
    } else if (loggedOut) {
      // User is logged out - should be in auth screens
      if (!inAuthGroup) {
        router.replace("/sign-in");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loggedInVerifiedEmail, emailVerifying, loggedOut, segments]);

  if (loading) {
    // TODO: Replace this with the splash screen (maybe as a provider or other setup, review the docs)
    return null;
  }

  return (
    <Stack>
      {/* Protect the main app for logged in and verified users */}
      <Stack.Protected guard={loggedInVerifiedEmail}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show the auth screens for logged out users. E.g sign in, sign up, email verification */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  // ThemeProvider sets the theme for the app navigation (tabs, etc.)
  // Get the color scheme from the selected theme
  const { colorScheme } = useSelectedTheme();

  // QueryClient is used to fetch data from the API
  // useState is used to create the query client only once and not on every render
  const [queryClient] = useState(() => new QueryClient());

  // PortalHost is required for certain components that need to be rendered outside of the main app component (apparently it should be last)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme as "light" | "dark"]}>
        <AuthenticationProvider>
          {children}
          <PortalHost />
        </AuthenticationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
