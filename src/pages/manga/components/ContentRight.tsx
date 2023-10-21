import Synopsis from "./Synopsis";
import ChapterList from "./ChapterList";
import { IMangaChapter } from "../../../shared/interfaces/manga";

import "../Manga.scss";
import Genres from "./Genres";

interface Props {
  alternativeName: string;
  artist: string;
  author: string;
  chapters: IMangaChapter[];
  genres: string[];
  name: string;
  synopsis: string;
}

function ContentRight({
  alternativeName,
  artist,
  author,
  chapters,
  genres,
  name,
  synopsis,
}: Props) {
  return (
    <div className="right-side flex column gap-5">
      <div className="flex column gap-4">
        <div>
          <h1 className="fsize-6">{name}</h1>
          <h3>{alternativeName}</h3>
        </div>
        <div className="flex gap-6">
          <p>
            <span className="font-bold">Author:</span> {author}
          </p>
          <p>
            <span className="font-bold">Artist:</span> {artist}
          </p>
        </div>
        <Genres genres={genres} />
      </div>
      <Synopsis text={synopsis} />
      <ChapterList chapters={chapters} />
    </div>
  );
}

export default ContentRight;
