import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Edit } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";

export default function EditButton({ ...props }: ButtonProps) {
  return (
    <Button variant="secondary" {...props}>
      <Icon as={Edit} />
      <Text>Edit</Text>
    </Button>
  );
}
