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

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (changes: any) => {
      if (changes[key]) {
        setData(changes[key].newValue);
      }
    };

    // Add listener
    if (chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(handleStorageChange);
    }

    return () => {
      // Remove listener on cleanup
      if (chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      }
    };
  }, [key]);

  const setItem = useCallback(
    async (value: T): Promise<void> => {
      await setStorageItem<T>(key, value);
      // Update local state immediately too
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
