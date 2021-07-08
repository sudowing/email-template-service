const Joi = require("@hapi/joi");

const emailBase = Joi.object({
  eid: Joi.string().guid({ version: ["uuidv4"] }),
  email_address: Joi.string().email(),
  name_first: Joi.string(),
  name_last: Joi.string(),
  user_type: Joi.string(),
});

module.exports = {emailBase};