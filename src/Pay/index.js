const validator = require('./validator');
const Request = require('../request');

const baseUrl = 'https://dev.neucron.io';

class Transaction {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }
  setAuthToken(token) {
    this.authToken = token;
  }

  getAuthToken() {
    return this.authToken;
  }

  async validate() {
    if (!this.auth.authToken) {
      throw new Error('You must logged In. Try calling auth() method first');
    }
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
    await this.validate();

    await this.validator.tx_multipayc(opts);

    const endpoint = '/tx/multipayc';

    const headers = {
      walletID: opts.walletID,
    };

    const requestBody = {
      ChangeAddress: opts.changeAddress,
      Input: opts.input,
      LockTime: opts.lockTime,
      Outputs: opts.outputs,
    };

    const response = await this.request.postRequest(baseUrl + endpoint, headers, requestBody);
    if (response instanceof Error) {
      throw response;
    }

    return response.headers;
  }

  async payChannelTxn(options) {
    try {
      await this.validate();

      await this.validator.payChannelTxn(options);

      const endpoint = '/tx/payc';

      const headers = {
        'Content-Type': 'application/json', // Assuming JSON payload
        'Authorization': `${options.accessToken}`, // Assuming you have an access token
      };

      const requestBody = {
        walletID: options.walletID,
        sendRequest: {
          address: options.sendData.address,
          amount: options.sendData.amount,
          date: options.sendData.date,
          sequence_Num: options.sendData.sequence_Num,
          time: options.sendData.time,
        },
      };

      const response = await this.request.postRequest(endpoint, headers, requestBody);

      if (response instanceof Error) {
        throw response;
      }

      return response.data;
    } catch (error) {
      throw new Error(`payChannelTxn failed: ${error.message}`);
    }
  }
}
