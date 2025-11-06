import { View } from "react-native";
import { Icon } from "@/src/components/ui/icon";
import { User } from "lucide-react-native";
import { Separator } from "@/src/components/ui/separator";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";
import { Text } from "@/src/components/ui/text";

export default function UserDetailsDisplay() {
  const { user } = useAuthentication();

  return (
    <View className="flex-row items-center gap-2">
      <Icon as={User} className="h-8 w-8" />
      <Separator className="h-full bg-muted-foreground/50" orientation="vertical" />
      <View className="flex-col gap-1">
        <Text className="font-bold text-sm">{user?.displayName ?? ""}</Text>
        <Text className="text-muted-foreground text-sm">{user?.email ?? ""}</Text>
      </View>
    </View>
  );
}
