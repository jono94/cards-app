/**
 * Global cssInterop configuration for components and icon libraries
 * Import this file in your root layout to enable className support
 */
import { cssInterop } from "nativewind";
import { TextInput } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

// Configure TextInput to support placeholderClassName for dark mode
cssInterop(TextInput, {
  className: {
    target: "style",
  },
  placeholderClassName: {
    target: "placeholderTextColor",
    nativeStyleToProp: {
      color: "placeholderTextColor",
    },
  },
});

// Configure all Expo vector icon sets you use in your app
cssInterop(EvilIcons, {
  className: {
    target: "style",
  },
});

// Add other icon libraries as needed, for example:
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import Ionicons from "@expo/vector-icons/Ionicons";
//
// cssInterop(FontAwesome, {
//   className: { target: "style" },
// });
//
// cssInterop(Ionicons, {
//   className: { target: "style" },
// });
