import { Platform } from "react-native";
import { settings } from "@/src/lib/settings";
import {
  getAuth,
  connectAuthEmulator,
  initializeAuth,
  // @ts-ignore: This is valid by raises an error no exported member
  getReactNativePersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getItem, setItem, removeItem } from "@/src/lib/localStorage";

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "fake-auth-domain",
  projectId: "fake-project-id",
  storageBucket: "fake-storage-bucket",
  messagingSenderId: "fake-messaging-sender-id",
  appId: "fake-app-id",
  measurementId: "fake-measurement-id",
};

const firebaseApp = initializeApp(firebaseConfig);

// https://github.com/expo/fyi/blob/main/firebase-js-auth-setup.md
if (Platform.OS !== "web") {
  initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence({
      getItem: (key: string) => getItem(key),
      setItem: (key: string, value: string) => setItem(key, value),
      removeItem: (key: string) => removeItem(key),
    }),
  });
}

const auth = getAuth(firebaseApp);
if (settings.firebaseAuthEmulatorUrl) {
  connectAuthEmulator(auth, settings.firebaseAuthEmulatorUrl);
}

export { auth };
