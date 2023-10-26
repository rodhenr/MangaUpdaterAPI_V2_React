export type Variant =
  | "primary-light"
  | "primary-dark"
  | "success"
  | "danger"
  | "bg-light"
  | "bg-dark"
  | "secondary-dark"
  | "secondary-light"
  | "bg-disabled";

export interface SizeProps {
  height?: string;
  width?: string;
}

export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "file"
  | "date"
  | "search";

export type FontSize =
  | "fsize-1"
  | "fsize-2"
  | "fsize-3"
  | "fsize-4"
  | "fsize-5";

export interface ISelectState {
  description: string;
  isHidden: boolean;
  value: string;
}

export interface IPageList {
  baseUrl: string;
  title: string;
}

export type IPadding =
  | ""
  | "p-1"
  | "p-2"
  | "p-3"
  | "p-4"
  | "p-5"
  | "ph-1"
  | "ph-2"
  | "ph-3"
  | "pv-1"
  | "pv-2"
  | "pv-3";
