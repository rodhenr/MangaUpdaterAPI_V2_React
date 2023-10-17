import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faSearch,
  faBars,
  faList,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(faGear, faSearch, faBars, faList, faCircleXmark);

import Avatar from "../components/avatar/Avatar";
import Button from "../components/button/Button";
import LoginModal from "../components/modal/LoginModal";
import RegisterModal from "../components/modal/RegisterModal";

import "./Root.scss";
import AuthContext from "../shared/context/AuthContext";

interface PageList {
  baseUrl: string;
  title: string;
}

const pages: PageList[] = [
  { baseUrl: "/", title: "Home" },
  { baseUrl: "/library", title: "Library" },
  { baseUrl: "/mylist", title: "My List" },
];

function Root() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const authContext = useContext(AuthContext);

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
          <p>MANGA UPDATER</p>
          <div className="flex gap-4">
            {pages.map((page) => (
              <div className="fsize-5">
                <Link to={`${page.baseUrl}`}>{page.title}</Link>
              </div>
            ))}
          </div>
          {authContext.userInfo.token ? (
              <Avatar
                color="text-secondary"
                imagePath={authContext.userInfo.avatar ?? ""}
                userName={authContext.userInfo.username ?? ""}
              />
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={changeLoginModalState}
                text="Login"
                variant="secondary-dark"
                width="100px"
              />
              <Button
                onClick={changeRegisterModalState}
                text="Register"
                variant="secondary-light"
                width="100px"
              />
            </div>
          )}
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
