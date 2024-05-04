import { createContext } from "react";
import { ThemeContextType } from "./Context.types";

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "dark",
  toggleThemeMode: () => {},
});

export default ThemeContext;
