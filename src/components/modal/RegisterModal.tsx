import { useState, ChangeEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeContext from "../../shared/context/ThemeContext";

import Input from "../input/Input";
import Button from "../button/Button";

import "./RegisterModal.scss";

interface Props {
  changeToLoginModal: () => void;
  closeModal: () => void;
  showModal: boolean;
}

function RegisterModal({
  changeToLoginModal,
  closeModal,
  showModal = true,
}: Props) {
  const { themeMode } = useContext(ThemeContext);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmationPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmationPassword(event.target.value);
  };

  const handleRegister = () => {};

  return (
    <div
      className={`registerModal-main flex column gap-4 radius-1 shadow-3 roboto space-around ${
        themeMode === "light" ? "secondary-dark" : "primary-dark"
      }`}
      style={{
        display: !showModal ? "none" : "flex",
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
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
      <div className="flex column gap-3">
        <div className="flex column gap-1">
          <label htmlFor="registerUsername">Username</label>
          <Input
            id="registerU"
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            value={username}
            variant="bg-light"
          />
        </div>
        <div className="flex column gap-1">
          <label htmlFor="registerEmail">Email</label>
          <Input
            id="registerEmail"
            onChange={handleEmailChange}
            placeholder="Enter your email"
            type="email"
            value={email}
            variant="bg-light"
          />
        </div>
        <div className="flex column gap-1">
          <label htmlFor="registerPassword">Password</label>
          <Input
            id="registerPassword"
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            type="password"
            value={password}
            variant="bg-light"
          />
        </div>
        <div className="flex column gap-1">
          <label htmlFor="confirmRegisterPassword">Confirm password</label>
          <Input
            id="confirmRegisterPassword"
            onChange={handleConfirmationPasswordChange}
            placeholder="Enter your password"
            type="password"
            value={confirmationPassword}
            variant="bg-light"
          />
        </div>
      </div>
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
          className="cursor-pointer text-secondary-light"
          onClick={changeToLoginModal}
        >
          Login
        </p>
      </div>
    </div>
  );
}

export default RegisterModal;
