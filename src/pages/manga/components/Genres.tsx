import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../../components/button/Button";

import "../Manga.scss";
import ThemeContext from "../../../shared/context/ThemeContext";

interface Props {
  genres: string[];
}

function Genres({ genres }: Props) {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex gap-1 w-100 border-box flex-wrap">
      {genres.map((genre) => (
        <Button
          fontSize="fsize-3"
          height="20px"
          key={uuidv4()}
          mouseover={false}
          text={genre}
          variant={themeMode === "light" ? "primary-light" : "secondary-light"}
          width="fit-content"
        />
      ))}
    </div>
  );
}

export default Genres;
