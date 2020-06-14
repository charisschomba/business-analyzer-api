import Joi from 'joi';
// business validation schema
const businessSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
  country: Joi.string()
    .required(),
  entity: Joi.string()
    .required(),
  address: Joi.string()
    .required(),
  countriesOfOperations: Joi.string()
    .required()
});

export default businessSchema;
