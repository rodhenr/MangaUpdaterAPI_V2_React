import useGetWindowWidth from "../../../hooks/useGetWindowWidth";

import Synopsis from "./Synopsis";
import ChapterList from "./ChapterList";
import { IMangaChapter } from "../../../shared/interfaces/manga";
import MangaInfo from "./MangaInfo";

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
  const windowWidth = useGetWindowWidth();

  return (
    <div className="right-side flex column gap-5">
      {windowWidth > 800 && (
        <MangaInfo
          alternativeName={alternativeName}
          artist={artist}
          author={author}
          genres={genres}
          name={name}
        />
      )}
      <Synopsis text={synopsis} />
      <div className="flex column">
        <ChapterList chapters={chapters} mangaId={mangaId} />
      </div>
    </div>
  );
}

export default ContentRight;
