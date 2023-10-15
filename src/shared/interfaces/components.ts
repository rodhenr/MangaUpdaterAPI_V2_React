export type Variant =
  | "primary-light"
  | "primary-dark"
  | "success"
  | "danger"
  | "bg-light"
  | "bg-dark"
  | "secondary-dark"
  | "secondary-light";

export interface SizeProps {
  height?: string;
  width?: string;
}

export type InputTypes = "text" | "email" | "password" | "file" | "date";

export type FontSize = "fsize-1" | "fsize-2" | "fsize-3" | "fsize-4" | "fsize-5";
