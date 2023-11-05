import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import ThemeContext from "../../shared/context/ThemeContext";

function ThemeButton() {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className={`flex-center ${
        themeContext.themeMode === "light"
          ? "secondary-dark secondary-dark-hover"
          : "bg-light bg-light-hover"
      } color-primary p-1 border-box round cursor-pointer`}
      onClick={() =>
        themeContext.toggleThemeMode(
          themeContext.themeMode === "light" ? "dark" : "light"
        )
      }
      style={{ height: "28px", width: "28px" }}
    >
      <FontAwesomeIcon
        className="fsize-4"
        icon={
          themeContext.themeMode === "dark"
            ? ("moon" as IconProp)
            : ("sun" as IconProp)
        }
      />
    </div>
  );
}

export default ThemeButton;
