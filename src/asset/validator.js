import Joi from 'joi';

class Validator {

  /**
   * Validates asset creation data.
   * @param {Object} options - The data for asset creation.
   * @throws {Error} Throws an error if the data is invalid.
   */
  async assetData(options) {
	const schema = Joi.object({
	  data: Joi.object().required(),
	  decimals: Joi.number().integer().required(),
	  description: Joi.string().required(),
	  image: Joi.string().required(),
	  name: Joi.string().required(),
	  properties: Joi.object({
		issuer: Joi.object({
		  email: Joi.string().email().required(),
		  governingLaw: Joi.string().required(),
		  issuerCountry: Joi.string().required(),
		  jurisdiction: Joi.string().required(),
		  legalForm: Joi.string().required(),
		  organisation: Joi.string().required(),
		}).required(),
		legal: Joi.object({
		  licenceId: Joi.string().required(),
		  terms: Joi.string().required(),
		}).required(),
		meta: Joi.object({
		  legal: Joi.object({
			terms: Joi.string().required(),
		  }).required(),
		  media: Joi.array().items(
			Joi.object({
			  URI: Joi.string().required(),
			  altURI: Joi.string().required(),
			  type: Joi.string().required(),
			})
		  ),
		  schemaId: Joi.string().required(),
		  website: Joi.string().required(),
		}).required(),
	  }).required(),
	  protocolId: Joi.string().required(),
	  satsPerToken: Joi.number().required(),
	  splitable: Joi.boolean().required(),
	  symbol: Joi.string().required(),
	  totalSupply: Joi.number().required(),
	}).required();
	await schema.validateAsync(options);
  }

}

export default new Validator();
