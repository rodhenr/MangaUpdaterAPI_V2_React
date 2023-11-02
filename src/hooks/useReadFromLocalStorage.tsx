import { useEffect, useState } from "react";

export default function useReadFromLocalStorage<T>(key: string): T | null {
  const readValue = (): T | null => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue
      ? (JSON.parse(localStorageValue ?? "") as T)
      : null;
  };

  const [value, setValue] = useState<T | null>(readValue());

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line
  }, []);

  return value;
}
