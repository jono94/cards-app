import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setItem = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { getItem, setItem, removeItem };
