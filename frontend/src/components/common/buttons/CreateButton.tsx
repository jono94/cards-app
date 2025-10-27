import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Plus } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";

export default function CreateButton({ ...props }: ButtonProps) {
  return (
    <Button variant="secondary" {...props}>
      <Icon as={Plus} />
      <Text>Create</Text>
    </Button>
  );
}
