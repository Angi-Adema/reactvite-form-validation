export function validateEmail(email) {
  const errors = [];

  if (email.length === 0) {
    errors.push("Email is required");
  }

  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Email must end with @webdevsimplified.com");
  }
  return errors;
}

export function validatePassword(password) {
  const errors = [];

  if (password.length < 10) {
    errors.push("Password must be at least 10 characters");
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Password must contain at least one number");
  }

  return errors;
}
