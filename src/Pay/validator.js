const Joi = require('joi');

class Validator {
  constructor() {
  }

  async txMultipayc(opts) {
    const schema = Joi.object({
      walletID: Joi.string(),
      input: Joi.array().items(
          Joi.object({
            sequenceNum: Joi.number().integer().required(),
            utxoId: Joi.number().integer().required(),
          }),
      ),
      lockTime: Joi.string().isoDate(),
      outputs: Joi.array().items(
          Joi.object({
            amount: Joi.number().integer().required(),
            asm: Joi.string().required(),
          }),
      ),
      changeAddress: Joi.string(),
    });

    await schema.validateAsync(opts);
  }

  /**
   * Initiates a payment channel transaction.
   *
   * @param {Object} options - The options for the payment channel transaction.
   * @param {string} options.walletID - The ID of the wallet initiating the transaction (query parameter).
   * @param {Object[]} options.inputs - Array of input data for the transaction.
   * @param {number} options.inputs[].sequenceNum - The sequence number of the input.
   * @param {number} options.inputs[].utxoId - The ID of the unspent transaction output (UTXO).
   * @param {string} options.lockTime - The lock time for the transaction (ISO date format).
   * @param {Object[]} options.outputs - Array of output data for the transaction.
   * @param {number} options.outputs[].amount - The amount for the output.
   * @param {string} options.outputs[].asm - The Assembly script for the output.
   * @param {string} options.changeAddress - The change address for the transaction.
   * @throws {Error} - If the options fail schema validation.
   */
  async payChannelTxn(options) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
      inputs: Joi.array().items(
          Joi.object({
            sequenceNum: Joi.number().integer().required(),
            utxoId: Joi.number().integer().required(),
          }),
      ).required(),
      lockTime: Joi.string().isoDate().required(),
      outputs: Joi.array().items(
          Joi.object({
            amount: Joi.number().integer().required(),
            asm: Joi.string().required(),
          }),
      ).required(),
      changeAddress: Joi.string().required(),
    });

    await schema.validateAsync(options);
    // Schema validation passed, proceed with the transaction logic
    // ...
  }
}
module.exports = new Validator;
