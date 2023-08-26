const Joi = require('joi');

class Validator {
    

    

      async tx_file(opts) {
        const schema = Joi.object({
          walletID: Joi.string(),
          upfile : Joi.any(),
        });
        await schema.validateAsync(opts);
      };


      async tx_mesign(opts) {
        const schema = Joi.object({
          walletID: Joi.string(),
          message: Joi.string().required(),
        });
        await schema.validateAsync(opts);
      };


      async tx_postdata(opts) {
        const schema = Joi.object({
          walletID: Joi.string(),
          message: Joi.string().required(),
        });
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