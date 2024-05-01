import { IMangaSubInfo, IMangaTitle } from '../api/Queries';
import Genres from './Genres';

type Props = {
  titles: IMangaTitle[];
  authors: IMangaSubInfo[];
  genres: IMangaSubInfo[];
};

const MangaInfo = ({ titles, authors, genres }: Props) => {
  const mainTitle = titles.filter((x) => x.isMainTitle);
  const alternativeTitle = titles.filter((x) => !x.isMainTitle);

  return (
    <div className="flex column gap-4">
      <div>
        <h1 className="fsize-6">{mainTitle.length > 0 ? mainTitle[0].name : ''}</h1>
        <h3>{alternativeTitle.length > 0 ? alternativeTitle[0].name : ''}</h3>
      </div>
      <div className="flex gap-6">
        <p>
          <span className="font-bold">Author:</span> {authors[0].name}
        </p>
        <p>
          <span className="font-bold">Artist:</span> {authors[0].name}
        </p>
      </div>
      <Genres genres={genres.map((x) => x.name)} />
    </div>
  );
};

export default MangaInfo;
