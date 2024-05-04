import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { MangaChapterType, MangaSubInfoType, MangaTitleType } from '../Manga.types';
import '../styles/Manga.scss';
import ChapterList from './ChapterList';
import MangaInfo from './MangaInfo';
import Synopsis from './Synopsis';

type ContentRightPropsType = {
  authors: MangaSubInfoType[];
  chapters: MangaChapterType[];
  genres: MangaSubInfoType[];
  mangaId: number;
  titles: MangaTitleType[];
  synopsis: string;
};

const ContentRight: React.FC<ContentRightPropsType> = ({
  authors,
  chapters,
  genres,
  mangaId,
  titles,
  synopsis,
}) => {
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
