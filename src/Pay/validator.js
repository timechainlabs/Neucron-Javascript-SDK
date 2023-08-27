const Joi = require('joi');

class Validator {
  constructor() {
  }

  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object} opts - Options for configuring the transaction.
   * @param {string} opts.walletID - The ID of the wallet associated with the transaction.
   * @param {Object[]} opts.input - An array of input objects representing UTXO sequence pairs.
   * @param {number} opts.input[].SequenceNum - The sequence number of the input UTXO.
   * @param {number} opts.input[].UtxoId - The ID of the input UTXO.
   * @param {string} opts.lockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                For example: "2006-01-02T15:04:05Z".
   * @param {Object[]} opts.outputs - An array of output objects defining the transaction outputs.
   * @param {number} opts.outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                        For example: 100.
   * @param {string} opts.outputs[].Asm - The script assembly (ASM) code for the output.
   *                                      For example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} opts.changeAddress - The change address for the transaction.
   *
   * @param {string} options.accessToken - The access token for authentication (Authorization header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @returns {Object} The headers of the response if successful.
   */

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
