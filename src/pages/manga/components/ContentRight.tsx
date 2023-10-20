import Synopsis from "./Synopsis";
import ChapterList from "./ChapterList";
import { IMangaChapter } from "../../../shared/interfaces/manga";

import "../Manga.scss";

interface Props {
  alternativeName: string;
  artist: string;
  author: string;
  chapters: IMangaChapter[];
  name: string;
  synopsis: string;
}

function ContentRight({
  alternativeName,
  artist,
  author,
  chapters,
  name,
  synopsis,
}: Props) {
  return (
    <div className="right-side flex column gap-5">
      <div>
        <h1 className="fsize-6">{name}</h1>
        <h3>{alternativeName}</h3>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">Author:</span> {author}
          </p>
          <p>
            <span className="font-bold">Artist:</span> {artist}
          </p>
        </div>
      </div>
      <Synopsis text={synopsis} />
      <ChapterList chapters={chapters} />
    </div>
  );
}

export default ContentRight;
