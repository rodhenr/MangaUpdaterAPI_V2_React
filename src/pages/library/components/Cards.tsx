import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../components/card/Card';
import ThemeContext from '../../../context/ThemeContext';
import { MangaInfoType } from '../Library.types';

type CardsPropsType = {
  mangas: MangaInfoType[];
};

const Cards: React.FC<CardsPropsType> = ({ mangas }) => {
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
