import { v4 as uuidv4 } from "uuid";

import Button from "../../../components/button/Button";

import "../Manga.scss";

interface Props {
  genres: string[];
}

function Genres({ genres }: Props) {
  return (
    <div className="flex gap-1 w-100 border-box flex-wrap">
      {genres.map((genre) => (
        <Button
          fontSize="fsize-3"
          height="20px"
          key={uuidv4()}
          mouseover={false}
          text={genre}
          width="fit-content"
        />
      ))}
    </div>
  );
}

export default Genres;
