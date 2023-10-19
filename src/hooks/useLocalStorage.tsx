import { useEffect, useState } from "react";

export type SetAction<T> = (value: T) => void;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetAction<T>] {
  const [value, setValue] = useState<T>(initialValue);

  const readValue = (): T => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue
      ? (JSON.parse(localStorageValue ?? "") as T)
      : initialValue;
  };

  const setLocalStorageValue: SetAction<T> = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line
  }, []);

  return [value, setLocalStorageValue];
}
