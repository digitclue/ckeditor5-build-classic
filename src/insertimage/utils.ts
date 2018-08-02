export const getUrlWithoutQuery = (url: string): string => {
  const queryStartIndex = url.lastIndexOf('?');

  if (queryStartIndex > -1) {
    return url.slice(0, url.lastIndexOf('?'));
  }

  return url;
};

export const isImageUrl = (url: string): boolean => /\.(jpeg|jpg|gif|png)$/.test(url);
