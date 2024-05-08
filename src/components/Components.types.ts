export type VariantType = "primary-light" | "primary-dark" | "success" | "danger" | "bg-light" | "bg-dark" | "secondary-dark" | "secondary-light" | "bg-disabled" | "bg-card-dark" | "bg-text-dark" | "bg-myanimelist";

export interface SizePropsType {
  height?: string;
  width?: string;
}

export type InputType = "text" | "email" | "password" | "file" | "date" | "search";

export type FontSizeType = "fsize-1" | "fsize-2" | "fsize-3" | "fsize-4" | "fsize-5";

export type SelectStateType = {
  description: string;
  isHidden: boolean;
  value: string;
}

export type PaddingType = "" | "p-1" | "p-2" | "p-3" | "p-4" | "p-5" | "ph-1" | "ph-2" | "ph-3" | "pv-1" | "pv-2" | "pv-3";