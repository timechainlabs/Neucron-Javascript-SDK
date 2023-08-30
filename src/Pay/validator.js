const Joi = require('joi');

class Validator {
  
  
    async tx_multipayc(opts) {
        const schema = Joi.object({
          X_Neucron_App_ID: Joi.string(),
          X_Neucron_Key_ID: Joi.string(),
          X_Neucron_Key_Secret: Joi.string(),
          X_Neucron_User_ID: Joi.string(),
          walletID: Joi.string(),
          Change_Address: Joi.string().required(),
          Input: Joi.array()
            .items(
              Joi.object({
                SequenceNum: Joi.number().required(),
                Utxo_index: Joi.number().required(),
              })
            )
            .min(1)
            .required(),
          LockTime: Joi.date().iso().required(),
          Outputs: Joi.array()
            .items(
              Joi.object({
                Amount: Joi.number().required(),
                Asm: Joi.string().required(),
              })
            )
            .min(1)
            .required(),
        }).required();
    
        await schema.validateAsync(opts);
      };


      async tx_payc(opts) {
        const schema = Joi.object({
          X_Neucron_App_ID: Joi.string(),
          X_Neucron_Key_ID: Joi.string(),
          X_Neucron_Key_Secret: Joi.string(),
          X_Neucron_User_ID: Joi.string(),
          walletID: Joi.string(),
          amount: Joi.number().required(),
          date: Joi.date().iso().required(),
          reciver_address: Joi.string().required(),
          sequence_Num: Joi.number().required(),
          time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
        }).required();
    
        await schema.validateAsync(opts);
      };

}
module.exports = new Validator();