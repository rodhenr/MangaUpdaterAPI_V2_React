import { createContext } from "react";
import { LoadingContextType } from "./Context.types";

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  changeLoadingState: () => null,
});

export default LoadingContext;
