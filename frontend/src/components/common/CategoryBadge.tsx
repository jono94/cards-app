import { Text } from "@/src/components/ui/text";
import { Badge } from "@/src/components/ui/badge";

interface Props {
  category: string;
  size?: "sm" | "md" | "lg";
}

export default function CategoryBadge({ category, size = "md" }: Props) {
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Badge key={category} variant="outline">
      <Text className={textSize[size]}>{category}</Text>
    </Badge>
  );
}
