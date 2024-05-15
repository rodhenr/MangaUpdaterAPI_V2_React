import { AxiosError } from 'axios';
import { ChangeEvent } from 'react';
import { ProblemDetailsType, ProfileDataType, UserProfileType } from '../../Layouts.types';
import { useChangeEmailMutation } from '../../api/Mutations';
import Buttons from './Buttons';
import Inputs from './Inputs';
import Messages from './Messages';
import UserInfo from './UserInfo';

type ProfilePropsType = {
  data: UserProfileType;
  changeEmailData: ProfileDataType;
  error: string | null;
  successMessage: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setChangeEmailData: React.Dispatch<React.SetStateAction<ProfileDataType>>;
  handleItemOnChange: () => void;
  emailDisabled: boolean;
  onCloseModal: () => void;
};

const Profile: React.FC<ProfilePropsType> = ({
  data,
  changeEmailData,
  error,
  successMessage,
  setChangeEmailData,
  setError,
  setSuccessMessage,
  handleItemOnChange,
  emailDisabled,
  onCloseModal,
}) => {
  const { mutateAsync } = useChangeEmailMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMessage(null);
    const { name, value } = event.target;

    setChangeEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateEmail = async () => {
    try {
      await mutateAsync({
        email: changeEmailData.profileEmail,
        password: changeEmailData.profilePassword,
        confirmationPassword: changeEmailData.profileConfirmPassword,
      });

      setSuccessMessage('Email changed!');
      handleItemOnChange();
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorStatus = axiosError.response?.status;

      if (errorStatus && errorStatus >= 400 && errorStatus <= 404 && axiosError.response?.data) {
        const problemDetails = axiosError.response?.data as ProblemDetailsType;

        let errorMessage = 'Error....';

        if (problemDetails.errors) {
          errorMessage = problemDetails.errors[Object.keys(problemDetails.errors)[0]][0];
        } else if (problemDetails.detail) {
          errorMessage = problemDetails.detail;
        }

        setError(errorMessage);
      } else {
        setError('Error....');
      }
    }
  };

  return (
    <>
      <UserInfo data={data} />
      <Messages error={error} successMessage={successMessage} />
      <Inputs
        changeEmailData={changeEmailData}
        emailDisabled={emailDisabled}
        handleItemOnChange={handleItemOnChange}
        handleOnChange={handleOnChange}
      />
      <Buttons
        changeEmailData={changeEmailData}
        handleUpdateEmail={handleUpdateEmail}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default Profile;
