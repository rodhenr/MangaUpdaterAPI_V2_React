import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBook,
  faCircleQuestion,
  faCircleXmark,
  faGear,
  faList,
  faMoon,
  faPenToSquare,
  faSearch,
  faSun,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import SpinLoading from '../components/loading/SpinLoading';
import LoadingContext from '../context/LoadingContext';
import Header from './components/header/Index';
import LoginModal from './components/loginModal/Index';
import LayoutOutlet from './components/outlet/Index';
import ProfileModal from './components/profileModal/Index';
import RegisterModal from './components/registerModal/Index';
import './styles/Root.scss';
library.add(
  faGear,
  faSearch,
  faBars,
  faList,
  faCircleXmark,
  faBook,
  faUsers,
  faSun,
  faMoon,
  faPenToSquare,
  faCircleQuestion
);

const Root = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const { isLoading } = useContext(LoadingContext);

  const changeLoginModalState = () => {
    if (isRegisterModalOpen) setIsRegisterModalOpen(false);
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const changeRegisterModalState = () => {
    if (isLoginModalOpen) setIsLoginModalOpen(false);
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  const changeModalsState = (openLogin: boolean, openRegister: boolean) => {
    setIsLoginModalOpen(openLogin);
    setIsRegisterModalOpen(openRegister);
  };

  const changeProfileModalState = () => {
    setIsProfileModal(!isProfileModal);
  };

  return (
    <>
      <Header
        changeLoginModalState={changeLoginModalState}
        changeProfileModalState={changeProfileModalState}
        changeRegisterModalState={changeRegisterModalState}
      />
      <LayoutOutlet />
      {isLoading && <SpinLoading />}
      {createPortal(
        <LoginModal
          changeToRegisterModal={() => changeModalsState(false, true)}
          closeModal={changeLoginModalState}
          showModal={isLoginModalOpen}
        />,
        document.body
      )}
      {createPortal(
        <RegisterModal
          changeToLoginModal={() => changeModalsState(true, false)}
          closeModal={changeRegisterModalState}
          showModal={isRegisterModalOpen}
        />,
        document.body
      )}
      {createPortal(
        <ProfileModal closeModal={() => setIsProfileModal(false)} showModal={isProfileModal} />,
        document.body
      )}
    </>
  );
};

export default Root;
