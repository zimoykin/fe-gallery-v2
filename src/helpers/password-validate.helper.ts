const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;

export function validatePassword(password: string) {
  return regex.test(password);
}
