export const limitText = (text: string, limit: number): string => {
  const words = text.split(" ");
  if (words.length > 7) {
    return words.slice(0, limit).join(" ") + "...";
  } else {
    return text;
  }
};
