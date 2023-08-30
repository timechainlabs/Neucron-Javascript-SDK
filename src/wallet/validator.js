const Joi = require('joi');


class Validator {
async wallet_address(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_address_create(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      path: Joi.string().required(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_balance(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_create(opts) {
    const schema = Joi.object({
      mnemonic: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_default(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_history(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_keys(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_list(opts) {
    const schema = Joi.object({
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_mnemonic(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    await schema.validateAsync(opts);
  };

  async wallet_utxo(opts) {

    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    
    await schema.validateAsync(opts);
  };

  async wallet_xpubkeys(opts) {

    const schema = Joi.object({
      walletID: Joi.string(),
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
    }).required();
    
    await schema.validateAsync(opts);
  };

}
module.exports = new Validator;