import Joi from 'joi';

// user validation schema
const userSchema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    fullname: Joi.string()
      .min(4)
      .max(15)
      .required(),
    username: Joi.string()
    .min(4)
    .max(15)
    .required(),
    password: Joi.string()
    .min(6)
    .required()
});

export const loginSchema = Joi.object({
    password: Joi.string()
    .min(6)
    .required(),
    email: Joi.string()
    .email()
    .required()
})

export default userSchema;
