import { ScrollView, View, Pressable } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/src/components/ui/card";
import { useTranslation } from "react-i18next";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const { resendEmailVerification } = useAuthentication();

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
            <Pressable onPress={resendEmailVerification}>
              <Text className="text-sm underline underline-offset-4">
                {t("verifyEmail.resendEmail")}
              </Text>
            </Pressable>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
