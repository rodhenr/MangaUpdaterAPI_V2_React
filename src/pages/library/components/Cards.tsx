import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../components/card/Card';
import ThemeContext from '../../../shared/context/ThemeContext';
import { IMangaInfo } from '../../home/api/Queries';

type Props = {
  mangas: IMangaInfo[];
};

const Cards = ({ mangas }: Props) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="library-main grid">
      {mangas.map((manga) => {
        return (
          <Card
            key={uuidv4()}
            color={themeMode === 'light' ? 'text-primary' : 'text-secondary'}
            id={manga.mangaId}
            imagePath={manga.coverUrl}
            text={manga.mangaName}
          />
        );
      })}
    </div>
  );
};

export default Cards;
