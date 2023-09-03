import Joi from 'joi';

class Validator {

	async signup(opts) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}).required();
		await schema.validateAsync(opts);
	}


	async login(opts) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}).required();
		await schema.validateAsync(opts);
	}

	async resetPassword(opts) {
		const schema = Joi.object({
			password: Joi.string().required(),
			token: Joi.string().required(),
		}).required();
		await schema.validateAsync(opts);
	}


	async forgotPassword(opts) {
		const schema = Joi.object({
			email: Joi.string().required(),
		}).required();
		await schema.validateAsync(opts);
	}
}

export default new Validator();




