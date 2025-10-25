import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Edit } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";

interface Props {
  size?: "default" | "sm" | "lg";
}

export default function EditButton({ size = "default" }: Props) {
  return (
    <Button variant="secondary" size={size}>
      <Icon as={Edit} />
      <Text>Edit</Text>
    </Button>
  );
}
