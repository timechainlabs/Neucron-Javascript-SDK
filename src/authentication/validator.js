import Joi from 'joi';

class Validator {

	async signup(options) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}).required();
		await schema.validateAsync(options);
	}


	async login(options) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}).required();
		await schema.validateAsync(options);
	}

	async resetPassword(options) {
		const schema = Joi.object({
			password: Joi.string().required(),
			token: Joi.string().required(),
		}).required();
		await schema.validateAsync(options);
	}


	async validateQueryParamsOfForgotPassword(options) {
		const schema = Joi.object({
			email: Joi.string().required(),
		}).required();
		await schema.validateAsync(options);
	}

  async phone(options) {
	const schema = Joi.object({
	  phone: Joi.string().required(),
	  country_code: Joi.string().required(),
	}).required();
	await schema.validateAsync(options);
  }


  async verifyPhoneNo(options) {
	const schema = Joi.object({
	  phone: Joi.string().required(),
	  otp: Joi.string().required(),
	}).required();
	await schema.validateAsync(options);
  }
}

export default new Validator();




