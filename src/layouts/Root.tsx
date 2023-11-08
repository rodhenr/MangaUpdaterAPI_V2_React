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
  faMoon
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

function Root() {
  const { themeMode } = useContext(ThemeContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
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
          <div className="flex-center gap-5">
            {windowWidth > 900 && <ThemeButton />}
            <AuthGroup
              changeLoginModalState={changeLoginModalState}
              changeRegisterModalState={changeRegisterModalState}
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
          closeModal={changeLoginModalState}
          showModal={isLoginModalOpen}
        />,
        document.body
      )}
      {createPortal(
        <RegisterModal
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
    </>
  );
}

export default Root;
