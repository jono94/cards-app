import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Plus } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";

interface Props {
  size?: "default" | "sm" | "lg";
}

export default function CreateButton({ size = "default" }: Props) {
  return (
    <Button variant="secondary" size={size}>
      <Icon as={Plus} />
      <Text>Create</Text>
    </Button>
  );
}
