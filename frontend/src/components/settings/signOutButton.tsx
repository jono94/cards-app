import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";
import { Icon } from "@/src/components/ui/icon";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function SignOutButton() {
  const { signOut } = useAuthentication();
  const { t } = useTranslation();
  return (
    <Button variant="ghost" onPress={signOut}>
      <Icon as={LogOut} />
      <Text>{t("settings.signOut")}</Text>
    </Button>
  );
}
