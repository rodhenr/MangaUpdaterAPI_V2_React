import { useState, ChangeEvent, useContext, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useLoginMutation } from "../../api/mutations/user/Auth";
import ThemeContext from "../../shared/context/ThemeContext";

import { IApiError, ILogin } from "../../shared/interfaces/auth";
import Input from "../input/Input";
import Button from "../button/Button";

import "./LoginModal.scss";

interface Props {
  changeToRegisterModal: () => void;
  closeModal: () => void;
  showModal: boolean;
}

function LoginModal({
  changeToRegisterModal,
  closeModal,
  showModal = true,
}: Props) {
  const { themeMode } = useContext(ThemeContext);
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLoginDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    try {
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        loginData.email
      );

      if (!loginData.email.trim()) {
        setError("Email cannot be empty");
        return;
      }

      if (!isEmail) {
        setError("Invalid email");
        return;
      }

      if (loginData.password.trim().length < 8) {
        setError("Password cannot be less than 8 characters");
        return;
      }

      setError(null);
      await loginMutation.mutateAsync(loginData);

      setLoginData({
        email: "",
        password: "",
      });

      closeModal();
      handleNavigate();
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as IApiError;

      setError(errorData.title);
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
      <div>
        <p className="text-danger">{error}</p>
      </div>
      <div className="flex column gap-3">
        <div className="flex column">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            onChange={handleLoginDataChange}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
            placeholder="Enter your password"
            minLength={8}
            type="password"
            value={loginData.password}
            variant="bg-light"
          />
        </div>
      </div>
      <div className="flex align-center space-between">
        <div className="flex-center gap-1">
          <input
            type="checkbox"
            id="check"
            className="cursor-pointer"
            disabled
          />
          <label htmlFor="check" className="text-disabled">
            Remember me
          </label>
        </div>
        <span className="cursor-pointer text-disabled">
          Forget your password?
        </span>
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
        <p
          className="cursor-pointer text-secondary-light text-hover-secondary-light"
          onClick={changeToRegisterModal}
        >
          Register
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
