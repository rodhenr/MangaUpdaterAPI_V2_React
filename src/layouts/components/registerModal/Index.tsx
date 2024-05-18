import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosError } from 'axios';
import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import { ApiErrorType, RegisterDataType } from '../../Layouts.types';
import { useRegisterMutation } from '../../api/Mutations';
import '../../styles/RegisterModal.scss';
import Inputs from './Inputs';

type RegisterModalPropsType = {
  changeToLoginModal: () => void;
  closeModal: () => void;
  showModal: boolean;
};

const RegisterModal: React.FC<RegisterModalPropsType> = ({
  changeToLoginModal,
  closeModal,
  showModal = true,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const [registerData, setRegisterData] = useState<RegisterDataType>({
    username: '',
    registerEmail: '',
    registerPassword: '',
    confirmationPassword: '',
  });
  const [error, setError] = useState<string | null>('');
  const [success, setSuccess] = useState<string | null>('');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  const registerMutation = useRegisterMutation();

  const handleRegisterDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = event.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      if (!registerData.username.trim()) {
        setError('Username cannot be empty');
        return;
      }

      if (!registerData.registerEmail.trim()) {
        setError('Email cannot be empty');
        return;
      }

      const onlyLettersRegex = /^[A-Za-z]+$/;

      if (!onlyLettersRegex.test(registerData.username)) {
        setError('Username cannot have spaces or numbers');
        return;
      }

      const isEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!isEmailRegex.test(registerData.registerEmail)) {
        setError('Invalid email');
        return;
      }

      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const digitRegex = /\d/;
      const nonAlphanumericRegex = /[^A-Za-z0-9]/;

      if (registerData.registerPassword.trim().length < 8) {
        setError('Password cannot be less than 8 characters');
        return;
      }

      if (registerData.confirmationPassword.trim().length < 8) {
        setError('Confirmation password cannot be less than 8 characters');
        return;
      }

      if (registerData.confirmationPassword !== registerData.registerPassword) {
        setError('Password and confirmation do not match');
        return;
      }

      if (
        !uppercaseRegex.test(registerData.registerPassword) ||
        !lowercaseRegex.test(registerData.registerPassword) ||
        !digitRegex.test(registerData.registerPassword) ||
        !nonAlphanumericRegex.test(registerData.registerPassword) ||
        !uppercaseRegex.test(registerData.confirmationPassword) ||
        !lowercaseRegex.test(registerData.confirmationPassword) ||
        !digitRegex.test(registerData.confirmationPassword) ||
        !nonAlphanumericRegex.test(registerData.confirmationPassword)
      ) {
        setError('Invalid format for password');
        return;
      }

      setError(null);
      await registerMutation.mutateAsync({
        username: registerData.username,
        email: registerData.registerEmail,
        password: registerData.registerPassword,
        confirmationPassword: registerData.confirmationPassword,
      });

      setRegisterData({
        username: '',
        registerEmail: '',
        registerPassword: '',
        confirmationPassword: '',
      });

      setSuccess('User registered!');

      setTimeout(() => {
        setSuccess(null);
        closeModal();
        handleNavigate();
      }, 2000);
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as ApiErrorType;

      setError(errorData.detail ?? errorData.title);
    }
  };

  return (
    <div
      className={`registerModal-main flex column gap-4 radius-1 shadow-3 roboto space-around ${
        themeMode === 'light' ? 'secondary-dark' : 'primary-dark'
      }`}
      style={{
        display: !showModal ? 'none' : 'flex',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <div className="flex align-center space-between">
        <h1 className="poppins fweight-2 fsize-6">Register</h1>
        <FontAwesomeIcon
          className="fsize-5 cursor-pointer hover-opacity-1"
          icon="circle-xmark"
          onClick={closeModal}
        />
      </div>
      <div>
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger font-bold fsize-4-5">{error}</p>}
      </div>
      <Inputs handleRegisterDataChange={handleRegisterDataChange} registerData={registerData} />
      <div className="flex-center w-100">
        <Button
          onClick={handleRegister}
          text="Register"
          useHover={true}
          variant="secondary-light"
        />
      </div>
      <div className="flex-center gap-3 ">
        <p>Already have an account?</p>
        <p
          className="cursor-pointer text-secondary-light text-hover-secondary-light"
          onClick={changeToLoginModal}
        >
          Login
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
