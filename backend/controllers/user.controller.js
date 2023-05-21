const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const getUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  let user = await userService.getUserById(id);
    if (user !== null) {
      res.status(httpStatus.OK).json(user);
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  res.status(httpStatus.OK).json(user);
});
module.exports = {
  getUser,
  register,
  login,
};
