import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string()
    .min(4)
    .max(15)
    .required(),
    password: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')
    .min(6)
    .required(),
    email: Joi.string()
    .email()
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