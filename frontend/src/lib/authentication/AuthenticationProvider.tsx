import "@/src/init/firebase";
import { createContext, PropsWithChildren, useState, useContext } from "react";
import * as FirebaseAuth from "firebase/auth";
import { createURL } from "expo-linking";

type AuthenticationContextType = {
  user: FirebaseAuth.User | null;
  emailVerified: boolean;
  signInEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  signUpEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  resendEmailVerification: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
};

const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

// Custom hook to access the authentication context
export function useAuthentication() {
  const value = useContext(AuthenticationContext);
  if (!value) {
    throw new Error("useAuthentication must be used within <AuthenticationProvider />");
  }
  return value;
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuth.User | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);

  const auth = FirebaseAuth.getAuth();

  FirebaseAuth.onAuthStateChanged(auth, (user) => {
    console.log("auth state changed", user);
    setUser(user);
    setEmailVerified(user?.emailVerified ?? false);
    if (user && !user.emailVerified) sendEmailVerification();
  });

  async function signInEmailAndPassword(email: string, password: string): Promise<boolean> {
    try {
      await FirebaseAuth.signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function signUpEmailAndPassword(email: string, password: string): Promise<boolean> {
    try {
      await FirebaseAuth.createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function sendEmailVerification(): Promise<boolean> {
    if (!user) {
      // TODO: Show error to user
      console.error("User not found");
      return false;
    }

    const actionCodeSettings: FirebaseAuth.ActionCodeSettings = {
      url: createURL("/verify-email"),
      handleCodeInApp: true,
      // Note: can force the app to open here using iOS and android specific settings
    };

    try {
      await FirebaseAuth.sendEmailVerification(user, actionCodeSettings);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function signOut(): Promise<boolean> {
    try {
      await FirebaseAuth.signOut(auth);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        emailVerified,
        signInEmailAndPassword,
        signUpEmailAndPassword,
        resendEmailVerification: sendEmailVerification,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
