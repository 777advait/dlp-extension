import { useCallback, useState, useEffect } from "react";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/utils/storage";

export function useChromeStorage<T>(key: string) {
  const [data, setData] = useState<T | undefined>(undefined);

  // Fetch data function
  const fetchData = useCallback(async () => {
    const result = await getStorageItem<T>(key);
    setData(result);
  }, [key]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleStorageChange = (changes: any) => {
      if (changes[key]) {
        setData(changes[key].newValue);
      }
    };

    if (chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(handleStorageChange);
    }

    return () => {
      if (chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      }
    };
  }, [key]);

  const setItem = useCallback(
    async (value: T): Promise<void> => {
      await setStorageItem<T>(key, value);
      setData(value);
    },
    [key],
  );

  const removeItem = useCallback(async (): Promise<void> => {
    await removeStorageItem(key);
    setData(undefined);
  }, [key]);

  return { data, setItem, removeItem, refresh: fetchData };
}
