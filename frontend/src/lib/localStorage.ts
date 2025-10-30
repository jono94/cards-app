import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

const getItem = <T>(key: string): T | undefined => {
  const value = storage.getString(key);
  return value !== undefined ? (JSON.parse(value) as T) : undefined;
};

const setItem = <T>(key: string, value: T): boolean => {
  try {
    storage.set(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const removeItem = (key: string): boolean => {
  return storage.remove(key);
};

export { getItem, setItem, removeItem };
