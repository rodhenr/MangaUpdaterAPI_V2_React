import { createContext } from "react";
import { AuthContextType } from "./Context.types";

const AuthContext = createContext<AuthContextType>({
  userInfo: {
    avatar: null,
    username: null,
    token: null,
    refreshToken: null,
    isAdmin: null
  },
  login: () => {},
  logout: () => {},
});

export default AuthContext;
