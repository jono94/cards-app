import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Trash2 } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";
import { useTranslation } from "react-i18next";

export default function EditButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();
  return (
    <Button variant="destructive" {...props}>
      <Icon as={Trash2} />
      <Text>{t("common:delete")}</Text>
    </Button>
  );
}
