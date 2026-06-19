export const getImageUrl = (url?: string) => {
  if (!url) return "";

  const index = url.indexOf("https://");

  return index !== -1 ? url.slice(index) : url;
};