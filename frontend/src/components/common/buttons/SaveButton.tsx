import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";
import { Check } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function SaveButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();
  return (
    <Button variant="default" {...props}>
      <Icon as={Check} className="text-primary-foreground" />
      <Text>{t("common:save")}</Text>
    </Button>
  );
}
