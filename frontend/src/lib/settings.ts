import Constants from "expo-constants";

export const settings = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl,
  environment: Constants.expoConfig?.extra?.environment ?? "development",
};
