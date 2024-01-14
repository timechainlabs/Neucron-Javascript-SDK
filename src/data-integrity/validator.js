import Joi from 'joi';

class Validator {

	async uploadFile(options) {
		const schema = Joi.object({
		  filePath: Joi.string().required(),
		  walletId: Joi.string(),
		  data: Joi.string(),
		});
	
		await schema.validateAsync(options);
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
