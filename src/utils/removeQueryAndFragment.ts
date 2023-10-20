export const removeQueryAndFragment = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
  } catch (e) {
    console.error("Invalid URL", e);
    return url;
  }
};
