import { useState, ChangeEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/mutations/user/Auth";
import ThemeContext from "../../shared/context/ThemeContext";

import { ILogin } from "../../shared/interfaces/auth";
import Input from "../input/Input";
import Button from "../button/Button";

import "./LoginModal.scss";

interface Props {
  closeModal: () => void;
  showModal: boolean;
}

function LoginModal({ closeModal, showModal = true }: Props) {
  const { themeMode } = useContext(ThemeContext);
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLoginDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync(loginData);

      setLoginData({
        email: "",
        password: "",
      });

      closeModal();
      handleNavigate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`loginModal-main flex column gap-4 radius-1 shadow-3 roboto space-around ${
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
        <h1 className="poppins fweight-2 fsize-6">Login</h1>
        <FontAwesomeIcon
          className="fsize-5 cursor-pointer hover-opacity-1"
          icon="circle-xmark"
          onClick={closeModal}
        />
      </div>
      <div className="flex column gap-3">
        <div className="flex column">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            onChange={handleLoginDataChange}
            placeholder="Enter your email"
            type="email"
            value={loginData.email}
            variant="bg-light"
          />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            onChange={handleLoginDataChange}
            placeholder="Enter your password"
            type="password"
            value={loginData.password}
            variant="bg-light"
          />
        </div>
      </div>
      <div className="flex align-center space-between">
        <div className="flex-center gap-1">
          <input type="checkbox" id="check" className="cursor-pointer" />
          <label htmlFor="check">Remember me</label>
        </div>
        <span className="cursor-pointer">Forget your password?</span>
      </div>
      <div className="flex-center w-100">
        <Button
          onClick={() => handleLogin()}
          loading={loginMutation.isPending ? true : false}
          text="Sign in"
          useHover={true}
          variant="secondary-light"
        />
      </div>
      <div className="flex-center gap-3 ">
        <p>Don't have an account?</p>
        <p>Register</p>
      </div>
    </div>
  );
}

export default LoginModal;
