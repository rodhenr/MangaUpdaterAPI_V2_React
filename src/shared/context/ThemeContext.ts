import { createContext } from "react";
import { ThemeContextType } from "../interfaces/context";

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "dark",
  toggleThemeMode: () => {},
});

export default ThemeContext;
