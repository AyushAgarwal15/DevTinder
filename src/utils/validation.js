// we can skip it also bcz have schema level validations but having it is also not bad

const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First name must be between 3 and 50 characters long");
  } else if (lastName.length < 3 || lastName.length > 50) {
    throw new Error("Last name must be between 3 and 50 characters long");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (password.length < 6 || password.length > 100) {
    throw new Error("Password must be between 6 and 100 characters long");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const { firstName, lastName, emailId, photoUrl, gender, age, about, skills } =
    req.body;

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );

  if (firstName && (firstName?.length < 3 || firstName?.length > 50)) {
    throw new Error("First name must be between 3 and 50 characters long");
  } else if (lastName && (lastName?.length < 3 || lastName?.length > 50)) {
    throw new Error("Last name must be between 3 and 50 characters long");
  } else if (emailId && !validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  } else if (gender && !["male", "female", "other"].includes(gender)) {
    throw new Error("Invalid gender");
  } else if ((age && age < 18) || age > 100) {
    throw new Error("Invalid age");
  } else if (about && about?.length > 500) {
    throw new Error("About field must be less than 500 characters long");
  } else if (skills && skills?.length > 10) {
    throw new Error("Skills field must not exceed 10 skills");
  }

  return isEditAllowed;
};

const validateEditPasswordData = (req) => {
  const { newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    throw new Error("confirmNewPassword does not match with newPassword");
  }
  if (newPassword?.length < 6 || newPassword?.length > 100) {
    throw new Error("Password must be between 6 and 100 characters long");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPasswordData,
};
