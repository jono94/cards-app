import { Appearance, useColorScheme } from "react-native";
import { useEffect } from "react";

export function useTheme() {
  // For the web to detect the correct theme, we need to add the "dark" class to the document element.
  const colorScheme = useColorScheme();

  function toggleTheme() {
    Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", colorScheme === "dark");
    }
  }, [colorScheme]);

  return {
    colorScheme,
    toggleTheme,
  };
}
