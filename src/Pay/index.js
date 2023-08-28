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

  // eslint-disable-next-line valid-jsdoc
  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object} options - Options for configuring the transaction.
   * @param {Object[]} options.input - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.input[].SequenceNum - The sequence number of the input UTXO.
   * @param {number} options.input[].Utxo_index - The Index of the input UTXO.
   * @param {string} options.lockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} options.changeAddress - The change address for the transaction.
   *
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txMultipayc(options, headers, queryParams) {
    try {
      await this.validate();
      await this.validator.txMultipayc(options);

      const endpoint = '/tx/multipayc';

      const requestHeaders = {
        'Authorization': headers.Authorization,
        'Content-Type': headers['Content-Type'],
        'walletID': queryParams.walletId,
      };

      const requestBody = {
        Change_Address: options.Change_Address,
        Input: options.Input,
        LockTime: options.LockTime,
        Outputs: options.Outputs,
      };

      const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

      if (response instanceof Error) {
        throw response;
      }

      return response.headers;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }

  /**
   * Initiates a payment channel transaction.
   *
   * @param {Object} options - The options for the payment channel transaction.
   * @param {string} options.walletID - The ID of the wallet initiating the transaction (query parameter).
   * @param {Object} options.sendData - The data for the transaction.
   * @param {string} options.sendData.address - The recipient's address.
   * @param {number} options.sendData.amount - The amount of the transaction.
   * @param {string} options.sendData.date - The date of the transaction (format: yyyy-mm-dd).
   * @param {number} options.sendData.sequence_Num - The sequence number of the transaction.
   * @param {string} options.sendData.time - The time of the transaction (format: hh:mm:ss).
   * @param {string} options.accessToken - The access token for authentication (Authorization header).
   * @return {Object} - The response data from the transaction.
   * @throws {Error} - If the transaction fails or encounters an error.
   */
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

      const response = await this.request.postRequest(baseUrl + endpoint, headers, requestBody);

      if (response instanceof Error) {
        throw response;
      }

      return response.data;
    } catch (error) {
      throw new Error(`payChannelTxn failed: ${error.message}`);
    }
  }
}

