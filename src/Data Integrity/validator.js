const Joi = require('joi');

class Validator {

      async tx_file(opts) {
        const schema = Joi.object({
          X_Neucron_App_ID: Joi.string(),
          X_Neucron_Key_ID: Joi.string(),
          X_Neucron_Key_Secret: Joi.string(),
          X_Neucron_User_ID: Joi.string(),
          walletID: Joi.string(),
          upfile: Joi.any(),
        }).required();
        await schema.validateAsync(opts);
      };


      async tx_mesign(opts) {
        const schema = Joi.object({
          X_Neucron_App_ID: Joi.string(),
          X_Neucron_Key_ID: Joi.string(),
          X_Neucron_Key_Secret: Joi.string(),
          X_Neucron_User_ID: Joi.string(),
          walletID: Joi.string(),
          message: Joi.string().required(),
        }).required();
        await schema.validateAsync(opts);
      };


      async tx_postdata(opts) {
        const schema = Joi.object({
          X_Neucron_App_ID: Joi.string(),
          X_Neucron_Key_ID: Joi.string(),
          X_Neucron_Key_Secret: Joi.string(),
          X_Neucron_User_ID: Joi.string(),
          walletID: Joi.string(),
          upfile: Joi.any(),
        }).required();
        await schema.validateAsync(opts);
      };

      async tx_upload(opts) {
        const schema = Joi.object({
          walletId: Joi.string(),
          upfile: Joi.any(),
        });
        await schema.validateAsync(opts);
      };
}
module.exports = new Validator();