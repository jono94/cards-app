import { ScrollView } from "react-native";
import { SignInForm } from "@/src/components/ui/sign-in-form";
import { useRouter } from "expo-router";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";

export default function SignIn() {
  const router = useRouter();
  const { signInEmailAndPassword } = useAuthentication();

  const handleSignIn = async (email: string, password: string) => {
    const success = await signInEmailAndPassword(email, password);
    if (!success) {
      console.error("Failed to sign in");
      // TODO: Show error to user
    }
  };

  const handleGoToForgotPassword = () => {
    router.push("/forgot-password"); // Push for back navigation
  };

  const handleGoToSignUp = () => {
    router.replace("/sign-up"); // No need for back navigation
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center p-4 py-8 sm:mt-16 mt-safe"
    >
      <SignInForm
        onSignIn={handleSignIn}
        onGoToForgotPassword={handleGoToForgotPassword}
        onGoToSignUp={handleGoToSignUp}
      />
    </ScrollView>
  );
}
