import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import { MangaSubInfoType } from '../Manga.types';

interface SourcesPropsType {
  sources: MangaSubInfoType[];
}

const Sources: React.FC<SourcesPropsType> = ({ sources }) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex gap-1 flex-wrap">
      {sources &&
        sources.map((source) => {
          return (
            <Button
              fontSize="fsize-3"
              height="20px"
              key={uuidv4()}
              mouseover={false}
              text={source.name}
              width="fit-content"
              variant={themeMode === 'light' ? 'bg-text-dark' : 'bg-text-dark'}
            />
          );
        })}
    </div>
  );
};

export default Sources;
