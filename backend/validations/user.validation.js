const Joi = require("joi");
const { objectId, password } = require("./custom.validation");

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId, "custom validation").required(),
  }),
};
const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password, "custom validation").required(),
    name: Joi.string().required(),
    role:Joi.string().valid('admin', 'user').required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password, "custom validation").required(),
  }),
};
module.exports = {
  getUser,
  register,
  login,
};
