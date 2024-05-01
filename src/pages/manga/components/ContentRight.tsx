import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { IMangaChapter, IMangaSubInfo, IMangaTitle } from '../api/Queries';
import '../styles/Manga.scss';
import ChapterList from './ChapterList';
import MangaInfo from './MangaInfo';
import Synopsis from './Synopsis';

type Props = {
  authors: IMangaSubInfo[];
  chapters: IMangaChapter[];
  genres: IMangaSubInfo[];
  mangaId: number;
  titles: IMangaTitle[];
  synopsis: string;
};

const ContentRight = ({ authors, chapters, genres, mangaId, titles, synopsis }: Props) => {
  const windowWidth = useGetWindowWidth();

  return (
    <div className="right-side flex column gap-5">
      {windowWidth > 800 && <MangaInfo titles={titles} authors={authors} genres={genres} />}
      <Synopsis text={synopsis} />
      <div className="flex column">
        <ChapterList chapters={chapters} mangaId={mangaId} />
      </div>
    </div>
  );
};

export default ContentRight;
