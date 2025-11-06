import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Text } from "@/src/components/ui/text";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  onForgotPassword: () => void;
}

export function ForgotPasswordForm({ onForgotPassword }: Props) {
  const { t } = useTranslation();

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            {t("forgotPassword.title")}
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            {t("forgotPassword.enterEmail")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">{t("common:email")}</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                returnKeyType="send"
              />
            </View>
            <Button className="w-full" onPress={onForgotPassword}>
              <Text>{t("forgotPassword.resetPassword")}</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
