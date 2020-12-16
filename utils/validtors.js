module.exports.validationRegisters = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "enter a valid email address  ";
    }
  }

  if (password === "") {
    errors.password = "passwords should not be empty empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "passwords should match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.loginValidator = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username should not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password should not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.postValidator = (body) => {
  const errors = {};
  if (body.trim() === "") {
    errors.body = "posts should not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
