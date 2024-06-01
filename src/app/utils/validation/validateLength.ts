function validateLength(value: number, condition: number): boolean {
  if (value < condition) {
    return false;
  }
  return true;
}

export default validateLength;
