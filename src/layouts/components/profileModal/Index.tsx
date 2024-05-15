import { useContext, useEffect, useState } from 'react';
import SpinLoading from '../../../components/loading/SpinLoading';
import ThemeContext from '../../../context/ThemeContext';
import { ProfileDataType } from '../../Layouts.types';
import { useGetProfileData } from '../../api/Queries';
import '../../styles/ProfileModal.scss';
import Header from './Header';
import Profile from './Profile';

type ProfileModalPropsType = {
  closeModal: () => void;
  showModal: boolean;
};

const ProfileModal: React.FC<ProfileModalPropsType> = ({ closeModal, showModal }) => {
  const { themeMode } = useContext(ThemeContext);
  const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
  const [changeEmailData, setChangeEmailData] = useState<ProfileDataType>({
    profileEmail: '',
    profilePassword: '',
    profileConfirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, isError, isFetching } = useGetProfileData();

  useEffect(() => {
    if (data?.email)
      setChangeEmailData((prev) => {
        return { ...prev, profileEmail: data.email };
      });
  }, [data, setChangeEmailData]);

  const onCloseModal = () => {
    handleItemOnChange();
    setError(null);
    setSuccessMessage(null);

    closeModal();
  };

  const handleItemOnChange = () => {
    setChangeEmailData({
      profilePassword: '',
      profileConfirmPassword: '',
      profileEmail: data?.email ?? '',
    });
    setEmailDisabled(!emailDisabled);
  };

  return (
    <div
      className={`profileModal-main flex column gap-4 radius-1 shadow-3 roboto space-around ${
        themeMode === 'light' ? 'secondary-dark' : 'primary-dark'
      } poppins`}
      style={{
        display: !showModal ? 'none' : 'flex',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      {isFetching ? (
        <SpinLoading />
      ) : (
        <div className="flex column gap-4">
          <Header onCloseModal={onCloseModal} />
          <div className="flex flex-1 flex-center column gap-4">
            {data && !isError ? (
              <Profile
                changeEmailData={changeEmailData}
                error={error}
                successMessage={successMessage}
                data={data}
                setChangeEmailData={setChangeEmailData}
                setError={setError}
                setSuccessMessage={setSuccessMessage}
                handleItemOnChange={handleItemOnChange}
                emailDisabled={emailDisabled}
                onCloseModal={onCloseModal}
              />
            ) : (
              <div>
                <Header onCloseModal={onCloseModal} />
                <p>An error occurred...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
