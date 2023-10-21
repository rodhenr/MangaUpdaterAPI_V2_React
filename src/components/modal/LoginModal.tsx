import { useState, ChangeEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";

import { axios } from "../../lib/axios";
import Input from "../input/Input";
import Button from "../button/Button";
import AuthContext from "../../shared/context/AuthContext";
import { AuthResponse, ILogin } from "../../shared/interfaces/auth";

import "./LoginModal.scss";
import { queryClient } from "../../lib/query-client";

interface Props {
  closeModal: () => void;
  showModal: boolean;
}

function LoginModal({ closeModal, showModal = true }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginMutation = useMutation({
    mutationFn: (loginData: ILogin) => {
      return axios.post<AuthResponse>("/api/auth/login", loginData);
    },
  });

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginMutation.mutateAsync({ email, password });

      const responseInfo = {
        avatar: response.data.userAvatar,
        username: response.data.userName,
        token: response.data.accessToken,
      };

      authContext.login(responseInfo);
      queryClient.invalidateQueries({ queryKey: ["homeData", "mangaData"] });

      setEmail("");
      setPassword("");
      setLoading(false);
      closeModal();
    } catch {
      setLoading(false);
      //some error
    }
  };

  return (
    <div
      className="loginModal-main flex column gap-4 secondary-dark radius-1 shadow-3 roboto space-around"
      style={{
        display: !showModal ? "none" : "flex",
        height: 350,
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: 500,
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
            onChange={handleEmailChange}
            placeholder="Enter your email"
            type="email"
            value={email}
            variant="bg-light"
          />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            type="password"
            value={password}
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
        {!loading ? (
          <Button
            onClick={handleLogin}
            text="Sign in"
            useHover={true}
            variant="secondary-light"
          />
        ) : (
          "carregando..."
        )}
      </div>
      <div className="flex-center gap-3 ">
        <p>Don't have an account?</p>
        <p>Register</p>
      </div>
    </div>
  );
}

export default LoginModal;
