const Joi = require('joi');
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
  countriesOfOperations: Joi.array()
    .required(),
  annualSales: Joi.string()
    .required()
});

module.exports =  businessSchema;
