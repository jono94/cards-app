import { ScrollView } from "react-native";
import { ForgotPasswordForm } from "@/src/components/ui/forgot-password-form";

export default function ForgotPassword() {
  const handleForgotPassword = () => {
    console.log("Submit forgot password form");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center p-4 py-8 sm:mt-16 mt-safe"
    >
      <ForgotPasswordForm onForgotPassword={handleForgotPassword} />
    </ScrollView>
  );
}
