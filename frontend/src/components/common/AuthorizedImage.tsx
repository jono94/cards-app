import { Image, type ImageProps, type ImageSource } from "expo-image";
import { useAuthentication } from "@/src/lib/authentication/AuthenticationProvider";

export default function AuthorizedImage({ ...props }: ImageProps) {
  const { idToken } = useAuthentication();
  return (
    <Image
      {...props}
      source={{
        ...(props.source as ImageSource),
        headers: {
          ...((props.source as ImageSource)?.headers ?? {}),
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
      }}
    />
  );
}
