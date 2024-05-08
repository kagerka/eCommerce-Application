function validateLeadingTrailingSpace(value: string): boolean {
  if (value.trim() !== value) {
    return false;
  }
  return true;
}

export default validateLeadingTrailingSpace;
