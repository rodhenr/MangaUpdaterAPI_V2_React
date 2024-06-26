import { useContext } from 'react';
import Button from '../../../components/button/Button';
import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';
import { getTokenAdminClaim } from '../../../utils/token';
import { MangaInfoType } from '../Library.types';

type InfoPropsType = {
  mangas: MangaInfoType[];
  setModalAddManga: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAddMangaSource: React.Dispatch<React.SetStateAction<boolean>>;
};

const Info: React.FC<InfoPropsType> = ({ mangas, setModalAddManga, setModalAddMangaSource }) => {
  const { themeMode } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const isUserAdmin = authContext.userInfo.token && getTokenAdminClaim(authContext.userInfo.token);

  const handleChangeAddMangaModal = () => {
    setModalAddManga((prev) => !prev);
  };

  const handleChangeAddMangaSourceModal = () => {
    setModalAddMangaSource((prev) => !prev);
  };

  return (
    <div className="flex space-between">
      <p className="fsize-4-5">Showing {mangas.length} results</p>
      {isUserAdmin && (
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
