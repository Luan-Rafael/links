import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "links-storage";

export type LinkStorage = {
  id: string;
  name: string;
  url: string;
  category: string;
};

async function get(): Promise<LinkStorage[]> {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY);
  return storage ? JSON.parse(storage) : [];
}
async function save(newLink: LinkStorage) {
  try {
    const storage = await get();
    const updated = [...storage, newLink];
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    const storage = await get();
    const updated = [...storage.filter((item) => item.id !== id)];
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

export const linkStorage = { get, save, remove };
