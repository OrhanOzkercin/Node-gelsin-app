const Joi = require("joi");
const createProduct = Joi.object({
  name: Joi.string().required().min(2),
  description: Joi.string().min(2),
  quantity: Joi.number().positive(),
  unit_price: Joi.number().positive(),
  category: Joi.array(),
});

const updateProduct = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  quantity: Joi.number().positive(),
  unit_price: Joi.number().positive(),
  category: Joi.array(),
  comments: Joi.array(),
  media: Joi.string(),
});

const addComment = Joi.object({
  comment: Joi.string().min(2).default(""),
  rate: Joi.number().required().min(1).max(5),
});

//! ÖDEV Joi ile File Validation konusunu araştıralım..
// const addMedia = Joi.object({
//   file: Joi.file().required(), //! Böyle bir kullanım mevcut mudur?
// });

module.exports = {
  createProduct,
  updateProduct,
  addComment,
};
