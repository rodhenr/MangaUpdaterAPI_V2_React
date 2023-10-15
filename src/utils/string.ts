export const truncateString = (text: string, maxCharacters: number) => {
  if (text.length > maxCharacters) {
    return `${text.substring(0, maxCharacters)}...`;
  } else {
    return text;
  }
};
