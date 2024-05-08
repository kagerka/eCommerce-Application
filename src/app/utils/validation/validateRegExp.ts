function validateRegExp(value: string, regexp: RegExp): boolean {
  if (!value.match(regexp)) {
    return false;
  }
  return true;
}

export default validateRegExp;
