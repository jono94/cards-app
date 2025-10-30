import { colorScheme, useColorScheme } from "nativewind";
import { Appearance } from "react-native";
import { useEffect, useState } from "react";
import { getItem, setItem } from "./localStorage";

/*
We allow the user to select a theme in the settings and it is stored persistently and load it on startup.
The theme can be either "light", "dark", or "system".
*/

const SELECTED_THEME_KEY = "SELECTED_THEME";
export type ColorSchemeOption = "light" | "dark" | "system";

// In-memory cache to avoid async reads on every render
// This gets set by loadSelectedTheme() on app startup
let cachedThemePreference: ColorSchemeOption | null = null;

export function useSelectedTheme() {
  // Get the color scheme from nativewind and also the setter for it.
  const { colorScheme, setColorScheme } = useColorScheme();

  // Watcher to ensure that the web theme is in sync with the native theme.
  useEffect(() => {
    setDOMClass(colorScheme);
  }, [colorScheme]);

  // Use a local variable to track the selected theme as there is no way to get it from
  // react native (it only provides "light" or "dark").
  // Use cached value if available (set during app startup), otherwise default to "system"
  const [selectedThemeState, setSelectedThemeState] = useState<ColorSchemeOption>(
    cachedThemePreference ?? "system",
  );

  // Set the selected theme and persist it to storage. Make sure we keep the web theme in sync.
  const setSelectedTheme = (theme: ColorSchemeOption) => {
    cachedThemePreference = theme; // Update cache immediately
    setItem(SELECTED_THEME_KEY, theme); // Persist to storage (async, but we don't wait)
    setColorScheme(theme); // Update NativeWind
    setSelectedThemeState(theme); // Update local state

    // Force a sync with the web theme, for some reason the useTheme doesn't this properly when
    // changing from dark to system if the system is set to dark. I would have thought that it
    // wouldn't need updating in this case but it does. This fixes it...
    if (theme === "system") {
      setDOMClass(Appearance.getColorScheme() as "light" | "dark");
    }
  };

  return {
    selectedTheme: selectedThemeState, // "light", "dark", or "system"
    colorScheme, // "light" or "dark"
    setSelectedTheme,
  };
}

export function loadSelectedTheme() {
  const theme = getItem<ColorSchemeOption>(SELECTED_THEME_KEY);
  console.log(`loadSelectedTheme: ${SELECTED_THEME_KEY}`, theme);

  if (theme === "light" || theme === "dark" || theme === "system") {
    cachedThemePreference = theme;
    colorScheme.set(theme as ColorSchemeOption);
  } else {
    // Use the Appearance API to get the correct system color at start up if we have no saved preference.
    // Note this means we are using the system color as we have no preference set.
    cachedThemePreference = "system";
    colorScheme.set(Appearance.getColorScheme() as ColorSchemeOption);
  }

  // Set the DOM class here as well since there are some occasional issues where the useTheme hook doesn't run and
  // the web theme is cleared on an app hot reload (might only effect dev)
  if (theme === "system") {
    setDOMClass(Appearance.getColorScheme() as "light" | "dark");
  } else if (theme === "light" || theme === "dark") {
    setDOMClass(theme);
  }
}

function setDOMClass(color: "light" | "dark" | undefined) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", color === "dark");
  }
}
