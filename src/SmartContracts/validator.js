const Joi = require('joi');

class Validator {
  
  async tx_asm(opts) {
    const schema = Joi.object({
       X_Neucron_App_ID: Joi.string(),
       X_Neucron_Key_ID: Joi.string(),
       X_Neucron_Key_Secret: Joi.string(),
       X_Neucron_User_ID: Joi.string(),
       satoshi: Joi.number().required(),
       script: Joi.string().required(),
    })
    await schema.validateAsync(opts);
  };

 

  async tx_multiple(opts) {
    const inputItemSchema = Joi.object({
        Output_Index: Joi.number().required(),
        Prev_Txid: Joi.string().required(),
        Sequence_Num: Joi.number().required(),
        Unlocking_Script: Joi.string().required(),
      });
      
    const outputItemSchema = Joi.object({
        Amount: Joi.number().required(),
        Asm: Joi.string().required(),
      });
      
    const schema = Joi.object({
        X_Neucron_App_ID: Joi.string(),
        X_Neucron_Key_ID: Joi.string(),
        X_Neucron_Key_Secret: Joi.string(),
        X_Neucron_User_ID: Joi.string(),
        walletID: Joi.string(),
        Change_Address: Joi.string().required(),
        Flag: Joi.string().valid('ALL').required(),
        Input: Joi.array().items(inputItemSchema).min(1).required(),
        LockTime: Joi.date().iso().required(),
        Outputs: Joi.array().items(outputItemSchema).min(1).required(),
      }).required();
      
    await schema.validateAsync(opts);
  };

  async tx_sign(opts) {
    const schema = Joi.object({
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
      walletID: Joi.string(),
      Change_Address: Joi.string().required(),
      Flag: Joi.string().valid('ALL').required(),
      Input: Joi.array()
        .items(
          Joi.object({
            Output_Index: Joi.number().required(),
            Prev_Txid: Joi.string().required(),
            Sequence_Num: Joi.number().required(),
            privatekey_in_Wif: Joi.string().required(),
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


  async tx_unlock(opts) {
    const schema = Joi.object({
      X_Neucron_App_ID: Joi.string(),
      X_Neucron_Key_ID: Joi.string(),
      X_Neucron_Key_Secret: Joi.string(),
      X_Neucron_User_ID: Joi.string(),
      UnLocking_script: Joi.string().required(),
      output_Index: Joi.number().required(),
      prevTxID: Joi.string().required(),
    }).required();

    await schema.validateAsync(opts);
  };



  

}
module.exports = new Validator();