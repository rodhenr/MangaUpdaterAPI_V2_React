import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../components/card/Card';
import ThemeContext from '../../../context/ThemeContext';

type SeeAlsoPropsType = {
  data: {
    coverUrl: string;
    mangaId: number;
    mangaName: string;
  }[];
};

const SeeAlso: React.FC<SeeAlsoPropsType> = ({ data }) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex column gap-2">
      <h3>See also</h3>
      <div className="flex gap-2">
        {data.map((manga) => (
          <Card
            color={themeMode === 'light' ? 'text-primary' : 'text-light'}
            id={manga.mangaId}
            imagePath={manga.coverUrl}
            key={uuidv4()}
            text={manga.mangaName}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeAlso;
