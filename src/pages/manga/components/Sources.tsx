import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import { MangaSourceType } from '../Manga.types';

interface SourcesPropsType {
  sources: MangaSourceType[];
  mangaId: number;
}

const Sources: React.FC<SourcesPropsType> = ({ sources, mangaId }) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex gap-1 flex-wrap">
      <Button
        text={'MyAnimeList'}
        fontSize="fsize-3"
        height={'25px'}
        width={'90px'}
        useHover={true}
        variant="bg-myanimelist"
        onClick={() =>
          window.open(`https://myanimelist.net/manga/${mangaId}`, '_blank', 'noreferrer')
        }
      />
      {sources &&
        sources.map((source) => {
          return (
            <Button
              fontSize="fsize-3"
              height="25px"
              key={uuidv4()}
              useHover={true}
              text={source.name}
              width="fit-content"
              onClick={() => window.open(source.url, '_blank', 'noreferrer')}
              variant={themeMode === 'light' ? 'bg-text-dark' : 'bg-text-dark'}
            />
          );
        })}
    </div>
  );
};

export default Sources;
