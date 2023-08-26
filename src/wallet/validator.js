const Joi = require('joi');


class Validator {
async walletaddress(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async walletaddress_create(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      path: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async walletbalance(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_create(opts) {
    const schema = Joi.object({
      mnemonic: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async walletdefault(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_history(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_keys(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_list(opts) {
    const schema = Joi.object({
      // blank
    });
    await schema.validateAsync(opts);
  };

  async wallet_mnemonic(opts) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_utxo(opts) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async wallet_xpubkeys(opts) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

}
module.exports = new Validator;