import Request from '../request.js';
import validator from './validator.js';

class SmartContracts {
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
   * Initiates a transaction to send funds/data with custom script. This function prepares and sends
   * a request to the designated API endpoint to create a transaction.
   * @param {string} options.script - custom script which you want to attach with your transaction.
   * @param {number} options.satoshi - amount of satoshi.
   * @param {string} [queryParams.walletId] - The ID of the wallet associated with the transaction (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txAsm(options, queryParams) {
	try {
	  await this.validate();
	  await this.validator.txAsm(options);

	  let endpoint = '/tx/asm';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };

	  if (queryParams && queryParams.walletId) {
		endpoint += `?walletID=${queryParams.walletId}`;
	  }

	  const requestBody = {
		'satoshi': options.satoshi,
		'script': options.script
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object[]} options.Input - An array of input objects representing UTXO sequence pairs.
   * @param {Object[]} options.Flag - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.Input[].Sequence_Num - The sequence number of the input UTXO.
   * @param {number} options.Input[].Output_Index - The Index of the input UTXO.
   * @param {number} options.Input[].Prev_Txid - The sequence number of the input UTXO.
   * @param {number} options.Input[].Unlocking_Script - The Index of the input UTXO.
   * @param {string} options.LockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.Outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.Outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.Outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} options.Change_Address - The change address for the transaction.
   *
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @param {string} [queryParams.walletId] - The ID of the wallet associated with the transaction (optional).
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txMultiple(options, headers,queryParams) {
	try {
	  await this.validate();
	  await this.validator.txMultiple(options);

	  const endpoint = '/tx/multiple';

	  let requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
	  };

	  if(queryParams && queryParams.walletId){
		requestHeaders = {
		  ...requestHeaders,
		  walletId: queryParams.walletId
		};
	  };

	  const requestBody = {
		Change_Address: options.Change_Address,
		Flag: options.Flag,
		Input: options.Input,
		LockTime: options.LockTime,
		Outputs: options.Outputs,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error.message);
	}
  }

  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object[]} options.Input - An array of input objects representing UTXO sequence pairs.
   * @param {Object[]} options.Flag - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.Input[].Sequence_Num - The sequence number of the input UTXO.
   * @param {number} options.Input[].Output_Index - The Index of the input UTXO.
   * @param {number} options.Input[].Prev_Txid - The sequence number of the input UTXO.
   * @param {number} options.Input[].privatekey_in_Wif - The Index of the input UTXO.
   * @param {string} options.LockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.Outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.Outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.Outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} options.Change_Address - The change address for the transaction.
   *
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txSign(options, queryParams, headers) {
	// TODO: Test This Endpoint [Workflow not tested - waiting[R&D]]
	try {
	  await this.validate();
	  await this.validator.txSign(options);

	  const endpoint = '/tx/sign';

	  const requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
		'walletID': queryParams.walletId,
	  };

	  const requestBody = {
		Change_Address: options.Change_Address,
		Flag: options.Flag,
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
	  throw new Error('Transaction request failed: ' + error.message);
	}
  }

  /**
   * Unlock the funds/data of previous transaction. This function prepares and sends
   * a request to the designated API endpoint to create a transaction of unlocking previous transaction.
   *
   * @param {string} options.UnLocking_script - unlocking script of prev transaction.
   * @param {number} options.output_Index - output index of prev transaction which user want to unlock.
   * @param {string} options.prevTxID - previous transaction id which user want to unlock.
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txUnlock(options, queryParams, headers) {
	try {
	  // TODO: Test this endpoint
	  await this.validate();
	  await this.validator.txUnlock(options);
	  const endpoint = '/tx/sign';

	  let requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
	  };

	  if (queryParams && queryParams.walletId) {
		requestHeaders = {
		  ...requestHeaders,
		  walletID: queryParams.walletId,
		};
	  }

	  const requestBody = {
		UnLocking_script: options.UnLocking_script,
		output_Index: options.output_Index,
		prevTxID: options.prevTxID
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error.message);
	}
  }

}
export default SmartContracts;
