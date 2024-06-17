const getCurrentUrl = (): string[] => {
  const mainUrl = ['Home'];
  const { pathname } = window.location;
  const arr = pathname.replace('/', '').split('/');
  const result = mainUrl.concat(arr);
  return result;
};

export default getCurrentUrl;
