function validateEmailAdress(value: string): boolean {
  const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!value.match(validEmailRegex)) {
    return false;
  }
  return true;
}

export default validateEmailAdress;
