const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getUserById = async (id) => {
  const result = await User.findById(id);
  return result;
};

const getUserByEmail = async (email) => {
  const result = await User.findOne({ email: email });
  return result;
};

const createUser = async (user) => {
  const { email } = user;
  const isEmailTaken = await User.isEmailTaken(email);
  if (!isEmailTaken) {
    const result = await User.create(user);
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (user) {
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (isPasswordMatch) return user;
  }
  throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  login,
};
