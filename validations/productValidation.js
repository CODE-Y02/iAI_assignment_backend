const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  image: Joi.string().uri().optional().allow(null, ''),
  price: Joi.number().positive().required(),
  categoryId: Joi.number().integer().positive().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  image: Joi.string().uri().optional().allow(null, ''),
  price: Joi.number().positive(),
  categoryId: Joi.number().integer().positive(),
}).min(1); // Requires at least one field to be updated

module.exports = {
  createProductSchema,
  updateProductSchema,
};
