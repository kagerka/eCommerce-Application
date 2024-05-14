function validateDateOfBirth(birthdate: Date): boolean {
  const age = 12;
  const today = new Date();
  const twelveYearsAgo = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());

  return birthdate < twelveYearsAgo;
}

export default validateDateOfBirth;
