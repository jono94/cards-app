import "@/src/lib/authentication/firebase";
import { createContext, PropsWithChildren, useState, useContext, useEffect } from "react";
import * as FirebaseAuth from "firebase/auth";
import { createURL } from "expo-linking";

// Standalone function to get ID token (can be called outside React components)
export async function getIdToken(): Promise<string | null> {
  const auth = FirebaseAuth.getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error("Failed to get ID token:", error);
    return null;
  }
}

type AuthenticationContextType = {
  user: FirebaseAuth.User | null;
  idToken: string | null;
  loading: boolean;
  loggedOut: boolean;
  loggedIn: boolean;
  emailVerifying: boolean;
  loggedInVerifiedEmail: boolean;
  signInEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  signUpEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  resendEmailVerification: (user: FirebaseAuth.User) => Promise<boolean>;
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

export enum AuthStatus {
  loading = "LOADING",
  loggedOut = "LOGGED_OUT",
  verifyingEmail = "VERIFYING_EMAIL",
  loggedInVerifiedEmail = "LOGGED_IN_VERIFIED_EMAIL",
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuth.User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.loading);

  const auth = FirebaseAuth.getAuth();

  useEffect(() => {
    const auth = FirebaseAuth.getAuth();
    const unsubscribe = FirebaseAuth.onAuthStateChanged(auth, async (user) => {
      setUser(user);
      const idToken = await user?.getIdToken();
      setIdToken(idToken ?? null);

      if (!user) {
        setAuthStatus(AuthStatus.loggedOut);
      } else if (!user.emailVerified) {
        setAuthStatus(AuthStatus.verifyingEmail);
        sendEmailVerification(user);
      } else {
        setAuthStatus(AuthStatus.loggedInVerifiedEmail);
      }
    });

    return () => unsubscribe();
  }, []);

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

  async function sendEmailVerification(user: FirebaseAuth.User): Promise<boolean> {
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
        idToken,
        loading: authStatus === AuthStatus.loading,
        loggedOut: authStatus === AuthStatus.loggedOut,
        loggedIn:
          authStatus === AuthStatus.loggedInVerifiedEmail ||
          authStatus === AuthStatus.verifyingEmail,
        emailVerifying: authStatus === AuthStatus.verifyingEmail,
        loggedInVerifiedEmail: authStatus === AuthStatus.loggedInVerifiedEmail,
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
