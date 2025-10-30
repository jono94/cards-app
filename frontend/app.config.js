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
