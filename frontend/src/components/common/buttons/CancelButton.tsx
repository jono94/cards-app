import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";
import { X } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function CancelButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();
  return (
    <Button variant="ghost" {...props}>
      <Icon as={X} />
      <Text>{t("common:cancel")}</Text>
    </Button>
  );
}
