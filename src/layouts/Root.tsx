import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
library.add(faGear, faSearch, faBars, faList, faCircleXmark, faBook, faUsers);

import LoginModal from "../components/modal/LoginModal";
import RegisterModal from "../components/modal/RegisterModal";
import PageGroup from "./components/PageGroup";
import AuthGroup from "./components/AuthGroup";

import "./Root.scss";

function Root() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

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
      <div className={`roboto primary-light`}>
        <div
          className={`root-main flex align-center space-between`}
          style={{ height: 50, margin: "auto", width: "65vw" }}
        >
          <h2>MANGA UPDATER</h2>
          <PageGroup />
          <AuthGroup
            changeLoginModalState={changeLoginModalState}
            changeRegisterModalState={changeRegisterModalState}
          />
        </div>
      </div>
      <div
        className="flex-1 w-100 roboto"
        style={{ margin: "2rem auto", width: "65vw" }}
      >
        <Outlet />
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
    </>
  );
}

export default Root;
