import Joi from 'joi';

class Validator {

	async txFile(opts) {
		const schema = Joi.object({
			upfile : Joi.any().required(),
		});
		await schema.validateAsync(opts);
	}

	async txMeSign(opts) {
		const schema = Joi.object({
			message: Joi.string().required(),
		});
		await schema.validateAsync(opts);
	}

	async txPostData(opts) {
		const schema = Joi.object({
			message: Joi.string().required(),
		});
		await schema.validateAsync(opts);
	}

	async txUpload(opts) {
		const schema = Joi.object({
			upfile: Joi.any(),
		});
		await schema.validateAsync(opts);
	}
}

export default new Validator();
