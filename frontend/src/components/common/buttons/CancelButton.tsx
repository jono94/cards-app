import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";
import { X } from "lucide-react-native";

export default function CancelButton({ ...props }: ButtonProps) {
  return (
    <Button variant="ghost" {...props}>
      <Icon as={X} />
      <Text>Cancel</Text>
    </Button>
  );
}
