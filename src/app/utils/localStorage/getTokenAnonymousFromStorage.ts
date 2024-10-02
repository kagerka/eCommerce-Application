function getTokenAnonymousFromStorage(): string | null {
  if (localStorage.getItem('tokenAnonymous') !== null) {
    const token = localStorage.getItem('tokenAnonymous');
    return token;
  }
  return null;
}

export default getTokenAnonymousFromStorage;
