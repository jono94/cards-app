export default ({ config }) => {
  return {
    ...config,
    name: getAppName(),
    ios: {
      ...config.ios,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      ...config.android,
      package: getUniqueIdentifier(),
    },
    extra: {
      ...config.extra,
      apiUrl: getApiUrl(),
      environment: getEnvironment(),
      firebaseAuthEmulatorUrl: getFirebaseAuthEmulatorUrl(),
    },
  };
};

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

// TODO: Replace "devjono" with a proper owned domain at some point
const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.devjono.cardsapp.dev";
  if (IS_PREVIEW) return "com.devjono.cardsapp.preview";
  return "com.devjono.cardsapp";
};

const getAppName = () => {
  if (IS_DEV) return "Cards App (Dev)";
  if (IS_PREVIEW) return "Cards App (Preview)";
  return "Cards App";
};

const getApiUrl = () => {
  if (IS_DEV) return process.env.API_URL; // Set in .env.local to webserver address (bound on 0.0.0.0)
  if (IS_PREVIEW) return "https://staging.cardsapp.jonosplaceholder.click/api/";
  return "https://cardsapp.jonosplaceholder.click/api/";
};

const getEnvironment = () => {
  if (IS_DEV) return "development";
  if (IS_PREVIEW) return "staging";
  return "production";
};

const getFirebaseAuthEmulatorUrl = () => {
  if (IS_DEV) return process.env.FIREBASE_AUTH_EMULATOR_URL;
  return undefined;
};
