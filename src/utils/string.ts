export const truncateString = (text: string, maxCharacters: number): string => {
  return text.length > maxCharacters ? `${text.substring(0, maxCharacters)}...` : text;
};
