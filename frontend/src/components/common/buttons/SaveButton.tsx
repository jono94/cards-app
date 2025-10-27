import { Button, type ButtonProps } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";
import { Check } from "lucide-react-native";

export default function SaveButton({ ...props }: ButtonProps) {
  return (
    <Button variant="default" {...props}>
      <Icon as={Check} color="white" />
      <Text>Save</Text>
    </Button>
  );
}
