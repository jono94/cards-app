import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Edit } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";
import { useTranslation } from "react-i18next";

export default function EditButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();
  return (
    <Button variant="secondary" {...props}>
      <Icon as={Edit} />
      <Text>{t("common:edit")}</Text>
    </Button>
  );
}
