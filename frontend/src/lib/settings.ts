import Constants from "expo-constants";

export const settings = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl,
  environment: Constants.expoConfig?.extra?.environment ?? "development",
  firebaseAuthEmulatorUrl: Constants.expoConfig?.extra?.firebaseAuthEmulatorUrl, // undefined if not used (only used in development)
};
