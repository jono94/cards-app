import { ScrollView } from "react-native";
import { SignUpForm } from "@/src/components/ui/sign-up-form";
import { useRouter } from "expo-router";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";

export default function SignUp() {
  const router = useRouter();
  const { signUpEmailAndPassword } = useAuthentication();

  const handleSignUp = async (email: string, password: string) => {
    const success = await signUpEmailAndPassword(email, password);
    if (!success) {
      console.error("Failed to sign up");
      // TODO: Show error to user
    }
  };

  const handleGoToSignIn = () => {
    router.replace("/sign-in"); // No need for back navigation
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center p-4 py-8 sm:mt-16 mt-safe"
    >
      <SignUpForm onSignUp={handleSignUp} onGoToSignIn={handleGoToSignIn} />
    </ScrollView>
  );
}
