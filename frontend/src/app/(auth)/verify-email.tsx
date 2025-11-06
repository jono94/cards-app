import { ScrollView, View, Pressable } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/src/components/ui/card";
import { useTranslation } from "react-i18next";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";
import { Redirect } from "expo-router";
import { Icon } from "@/src/components/ui/icon";
import { Mail, LogOut } from "lucide-react-native";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const { user, resendEmailVerification, signOut } = useAuthentication();

  if (!user) {
    // Shouldn't happen due to route guard but this removes type errors.
    return <Redirect href="/sign-in" />;
  }

  return (
    <ScrollView contentContainerClassName="sm:flex-1 items-center p-4 py-8 sm:mt-16 mt-safe">
      <View className="gap-6">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              {t("verifyEmail.title")}
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              {t("verifyEmail.description")}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <View className="flex-col gap-4">
              <Pressable onPress={() => resendEmailVerification(user)}>
                <View className="flex-row gap-2 items-center">
                  <Icon as={Mail} />
                  <Text className="text-sm hover:underline underline-offset-4">
                    {t("verifyEmail.resendEmail")}
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => signOut()}>
                <View className="flex-row gap-2 items-center">
                  <Icon as={LogOut} />
                  <Text className="text-sm hover:underline underline-offset-4">
                    {t("verifyEmail.signOutInsteadOfVerifyingEmail")}
                  </Text>
                </View>
              </Pressable>
            </View>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
