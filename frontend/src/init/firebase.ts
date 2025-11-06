import { settings } from "@/src/lib/settings";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeApp } from "firebase/app";

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
const auth = getAuth(firebaseApp);
if (settings.firebaseAuthEmulatorUrl) {
  connectAuthEmulator(auth, settings.firebaseAuthEmulatorUrl);
}
