const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
