const Joi = require('joi');

class Validator {

  async auth_forgot_password(opts) {
    const schema = Joi.object({
      email: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };
  
  async auth_login(opts) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async auth_phone(opts) {
    const schema = Joi.object({
      phone: Joi.string().required(),
      country_code: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async signup(opts) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required();

    await schema.validateAsync(opts);
  };

  
  

  async resetPassword(opts) {
    const schema = Joi.object({
      password: Joi.string().required(),
      token: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  
  
}
module.exports = new Validator();


 

