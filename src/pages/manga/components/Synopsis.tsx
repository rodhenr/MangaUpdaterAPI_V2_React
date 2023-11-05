import { useContext } from "react";

import ThemeContext from "../../../shared/context/ThemeContext";

interface Props {
  text: string;
}

function Synopsis({ text }: Props) {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex column gap-2">
      <h1 className="fsize-5">Synopsis</h1>
      <div
        className={`radius-2 p-4 ${
          themeMode === "light" ? "secondary-light" : "primary-dark"
        }`}
      >
        <p className="text-justify">{text}</p>
      </div>
    </div>
  );
}

export default Synopsis;
