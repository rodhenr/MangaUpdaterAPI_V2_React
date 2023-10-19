import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "../input/Input";
import Button from "../button/Button";

import "./RegisterModal.scss";

interface Props {
  closeModal: () => void;
  showModal: boolean;
}

function RegisterModal({ closeModal, showModal = true }: Props) {
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
      className="registerModal-main flex column gap-4 secondary-dark radius-1 shadow-3 roboto space-around"
      style={{
        display: !showModal ? "none" : "flex",
        height: 400,
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: 600,
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
      <div className="flex column gap-2">
        <div className="flex column">
          <label htmlFor="registerUsername">Username</label>
          <Input
            id="registerU"
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            value={username}
            variant="bg-light"
          />
        </div>
        <div className="flex column">
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
        <div className="flex column">
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
        <div className="flex column">
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
          variant="secondary-light"
        />
      </div>
    </div>
  );
}

export default RegisterModal;
