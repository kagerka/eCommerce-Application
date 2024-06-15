function getTokenPasswordFromStorage(): string | null {
  if (localStorage.getItem('tokenPassword') !== null) {
    const tokenPsw = localStorage.getItem('tokenPassword');
    return tokenPsw;
  }
  return null;
}

export default getTokenPasswordFromStorage;
