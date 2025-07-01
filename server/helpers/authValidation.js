import Joi from "joi";

const userSignUpValidation = Joi.object({
  userName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(4).max(100).required(),
});

export { userSignUpValidation };
