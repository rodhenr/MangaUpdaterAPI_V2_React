import { useEffect, useState } from "react";

export type StorageValue<T> = T | null;

export default function useReadFromLocalStorage<T>(
  key: string
): StorageValue<T> {
  const readValue = (): StorageValue<T> => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue
      ? (JSON.parse(localStorageValue ?? "") as T)
      : null;
  };

  const [value, setValue] = useState<StorageValue<T>>(readValue());

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line
  }, []);

  return value;
}
