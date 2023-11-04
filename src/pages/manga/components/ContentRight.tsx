import Synopsis from "./Synopsis";
import ChapterList from "./ChapterList";
import { IMangaChapter } from "../../../shared/interfaces/manga";

import Genres from "./Genres";

import "../Manga.scss";

interface Props {
  alternativeName: string;
  artist: string;
  author: string;
  chapters: IMangaChapter[];
  genres: string[];
  mangaId: number;
  name: string;
  synopsis: string;
}

function ContentRight({
  alternativeName,
  artist,
  author,
  chapters,
  genres,
  mangaId,
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
      <div className="flex column">
        <ChapterList chapters={chapters} mangaId={mangaId} />
      </div>
    </div>
  );
}

export default ContentRight;
