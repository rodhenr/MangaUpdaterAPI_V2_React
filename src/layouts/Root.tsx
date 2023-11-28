import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
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
} from "@fortawesome/free-solid-svg-icons";
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
  faPenToSquare
);

import LoadingContext from "../shared/context/LoadingContext";
import ThemeContext from "../shared/context/ThemeContext";

import useGetWindowWidth from "../hooks/useGetWindowWidth";

import LoginModal from "../components/modal/LoginModal";
import RegisterModal from "../components/modal/RegisterModal";
import PageGroup from "./components/PageGroup";
import AuthGroup from "./components/AuthGroup";
import SpinLoading from "../components/loading/SpinLoading";
import ThemeButton from "../components/theme/ThemeButton";

import "./Root.scss";
import ProfileModal from "../components/modal/ProfileModal";

function Root() {
  const { themeMode } = useContext(ThemeContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const { isLoading } = useContext(LoadingContext);
  const windowWidth = useGetWindowWidth();

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
      <div
        className={`roboto ${
          themeMode === "light" ? "primary-light" : "bg-menu-dark"
        }`}
      >
        <div className="root-main flex align-center">
          <h2>MANGA UPDATER</h2>
          <PageGroup />
          <div className="flex-center gap-4">
            {windowWidth > 900 && <ThemeButton />}
            <AuthGroup
              changeLoginModalState={changeLoginModalState}
              changeRegisterModalState={changeRegisterModalState}
              changeProfileModalState={changeProfileModalState}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex-1 w-100 roboto ${
          themeMode === "light" ? "bg-light" : "bg-dark"
        }`}
      >
        <div className="outlet-main flex-1 roboto">
          <Outlet />
        </div>
      </div>
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
      {isLoading && (
        <div className="absolute flex-center bg-modal-back h-100 w-100">
          <SpinLoading />
        </div>
      )}
      {createPortal(
        <ProfileModal
          closeModal={() => setIsProfileModal(false)}
          showModal={isProfileModal}
        />,
        document.body
      )}
    </>
  );
}

export default Root;
