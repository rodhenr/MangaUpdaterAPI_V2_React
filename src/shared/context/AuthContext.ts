import { createContext } from "react";
import { AuthContextType } from "../interfaces/context";

const AuthContext = createContext<AuthContextType>({
  userInfo: {
    avatar: null,
    username: null,
    token: null,
  },
  login: () => {},
  logout: () => {},
});

export default AuthContext;
