import { useContext } from 'react';
import Button from '../../../components/button/Button';
import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';
import { IMangaInfo } from '../api/Queries';

type Props = {
  mangas: IMangaInfo[];
  setModalAddManga: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAddMangaSource: React.Dispatch<React.SetStateAction<boolean>>;
};

const Info = ({ mangas, setModalAddManga, setModalAddMangaSource }: Props) => {
  const { themeMode } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

  const handleChangeAddMangaModal = () => {
    setModalAddManga((prev) => !prev);
  };

  const handleChangeAddMangaSourceModal = () => {
    setModalAddMangaSource((prev) => !prev);
  };

  return (
    <div className="flex space-between">
      <p className="fsize-4-5">Showing {mangas.length} results</p>
      {authContext.userInfo.isAdmin && (
        <div className="flex gap-2">
          <Button
            fontSize="fsize-3"
            onClick={() => handleChangeAddMangaModal()}
            text="Register Manga"
            width="fit-content"
            useHover={true}
            variant={themeMode === 'light' ? 'primary-light' : 'secondary-light'}
          />
          <Button
            fontSize="fsize-3"
            onClick={() => handleChangeAddMangaSourceModal()}
            text="Register Source"
            width="fit-content"
            useHover={true}
            variant={themeMode === 'light' ? 'primary-light' : 'secondary-light'}
          />
        </div>
      )}
    </div>
  );
};

export default Info;
