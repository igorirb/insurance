const Joi = require('joi');

const schemas = {
  post: Joi.object().keys({
    age: Joi.number().min(0).required(),
    dependents: Joi.number().min(0).required(),
    house: Joi.object().keys({
      ownership_status: Joi.string().valid('owned', 'mortgaged').required(),
    }).allow(null),
    income: Joi.number().min(0).required(),
    marital_status: Joi.string().valid('single', 'married').required(),
    risk_questions: Joi.array().items(Joi.number().valid(0, 1)),
    vehicle: Joi.object().keys({
      year: Joi.number().min(0).required(),
    }).allow(null),
  }),
};

module.exports = schemas;
