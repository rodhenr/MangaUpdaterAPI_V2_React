import { createContext } from "react";
import { LoadingContextType } from "../interfaces/context";

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  changeLoadingState: () => null,
});

export default LoadingContext;
