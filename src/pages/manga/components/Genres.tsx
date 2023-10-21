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
          text={genre}
          width="fit-content"
        />
      ))}
    </div>
  );
}

export default Genres;
