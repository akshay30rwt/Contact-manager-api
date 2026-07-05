const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required(),
    category: Joi.string().valid('Friend', 'Family', 'Work', 'Other').required()
});

module.exports = { contactSchema };