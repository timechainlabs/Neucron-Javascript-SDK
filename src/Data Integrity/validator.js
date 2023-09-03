import Joi from 'joi';

class Validator {




	async txFile(opts) {
		const schema = Joi.object({
			walletID: Joi.string(),
			upfile : Joi.any(),
		});
		await schema.validateAsync(opts);
	}


	async txMeSign(opts) {
		const schema = Joi.object({
			walletID: Joi.string(),
			message: Joi.string().required(),
		});
		await schema.validateAsync(opts);
	}


	async txPostData(opts) {
		const schema = Joi.object({
			walletID: Joi.string(),
			message: Joi.string().required(),
		});
		await schema.validateAsync(opts);
	}





	async txUpload(opts) {
		const schema = Joi.object({
			walletId: Joi.string(),
			upfile: Joi.any(),
		});
		await schema.validateAsync(opts);
	}
}

export default new Validator();
