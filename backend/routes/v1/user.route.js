const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.get(`/:userId`,validate(userValidation.getUser),userController.getUser);
router.post(`/register`,validate(userValidation.register),userController.register);
router.post('/login',validate(userValidation.login),userController.login);

module.exports = router;
