import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useColorScheme } from "nativewind";
import { Image, Platform, View } from "react-native";

export enum SocialTypes {
  OAUTH_APPLE = "oauth_apple",
  OAUTH_GOOGLE = "oauth_google",
  OAUTH_GITHUB = "oauth_github",
}

const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: SocialTypes.OAUTH_APPLE,
    source: { uri: "https://img.clerk.com/static/apple.png?width=160" },
    useTint: true,
  },
  {
    type: SocialTypes.OAUTH_GOOGLE,
    source: { uri: "https://img.clerk.com/static/google.png?width=160" },
    useTint: false,
  },
  {
    type: SocialTypes.OAUTH_GITHUB,
    source: { uri: "https://img.clerk.com/static/github.png?width=160" },
    useTint: true,
  },
];

interface Props {
  socials: SocialTypes[];
}

export function SocialConnections({ socials }: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        if (!socials.includes(strategy.type)) {
          return null;
        }

        return (
          <Button
            key={strategy.type}
            variant="outline"
            size="sm"
            className="sm:flex-1"
            onPress={() => {
              // TODO: Authenticate with social provider and navigate to protected screen if successful
            }}
          >
            <Image
              className={cn("size-4", strategy.useTint && Platform.select({ web: "dark:invert" }))}
              tintColor={Platform.select({
                native: strategy.useTint ? (colorScheme === "dark" ? "white" : "black") : undefined,
              })}
              source={strategy.source}
            />
          </Button>
        );
      })}
    </View>
  );
}
