import { SocialConnections, SocialTypes } from "@/src/components/ui/social-connections";
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
import { Separator } from "@/src/components/ui/separator";
import { Text } from "@/src/components/ui/text";
import * as React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

interface Props {
  onSignUp: (email: string, password: string) => void;
  onGoToSignIn: () => void;
  socials?: SocialTypes[];
}

export function SignUpForm({ onSignUp, onGoToSignIn, socials = [] }: Props) {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    onSignUp(data.email, data.password);
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">{t("signUp.title")}</CardTitle>
          <CardDescription className="text-center sm:text-left">
            {t("signUp.welcome")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Email */}
            <View className="gap-1.5">
              <Label htmlFor="email">{t("common:email")}</Label>
              <Controller
                control={control}
                name="email"
                rules={{ required: t("signUp.emailRequired") }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="email"
                    placeholder="user@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-destructive text-sm pl-2">* {errors.email.message}</Text>
              )}
            </View>

            {/* Password */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">{t("common:password")}</Label>
              </View>
              <Controller
                control={control}
                name="password"
                rules={{ required: t("signUp.passwordRequired") }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="password"
                    secureTextEntry
                    returnKeyType="send"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-destructive text-sm pl-2">* {errors.password.message}</Text>
              )}
            </View>

            {/* Submit */}
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <Text>{t("common:continue")}</Text>
            </Button>
          </View>

          {/* Go to sign in */}
          <Text className="text-center text-sm">
            {t("signUp.alreadyHaveAnAccount")}{" "}
            <Text className="text-sm underline underline-offset-4" onPress={onGoToSignIn}>
              {t("signUp.signIn")}
            </Text>
          </Text>

          {/* Socials */}
          {socials.length > 0 && (
            <>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
                <Text className="text-muted-foreground px-4 text-sm">{t("common:or")}</Text>
                <Separator className="flex-1" />
              </View>
              <SocialConnections socials={socials} />
            </>
          )}
        </CardContent>
      </Card>
    </View>
  );
}
