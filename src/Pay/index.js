import Request from '../request';
import validator from './validator';

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
   * @param {{walletId: string}} options - Options for configuring the transaction.
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
   * @param {Object} data - The data for the transaction.
   * @param {string} data.reciver_address - The recipient's address.
   * @param {number} data.amount - The amount of the transaction.
   * @param {string} data.date - The date of the transaction (format: yyyy-mm-dd).
   * @param {number} data.sequence_Num - The sequence number of the transaction.
   * @param {string} data.time - The time of the transaction (format: hh:mm:ss).
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @throws {Error} - If the transaction fails or encounters an error.
   * @returns {Object} - The response data from the transaction.
   */

	async payChannelTxn(queryParams, headers, data) {
		try {
			await this.validate();
			await this.validator.payChannelTransaction(data);

			const endpoint = '/tx/payc';

			const requestHeaders = {
				'Authorization': headers.Authorization,
				'Content-Type': headers['Content-Type'],
				'walletID': queryParams.walletId,
			};

			const requestBody = {
				amount: data.amount,
				date: data.date,
				reciver_address: data.reciver_address,
				sequence_Num: data.sequence_Num,
				time: data.time,
			};

			await this.request.postRequest(endpoint, requestBody, requestHeaders);
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
   * Initiates a transaction for sending cryptocurrency to multiple output addresses.
   *
   * @param {{change_Address: string, output_Utxo: [{amount: number, address: string}]}} options - Options for configuring the transaction.
   * @param {Object[]} options.output_Utxo - An array of output objects representing recipient addresses and amounts.
   * @param {string} options.output_Utxo[].address - The recipient's address.
   * @param {number} options.output_Utxo[].amount - The amount of cryptocurrency to be sent, in integer units.
   * @param {string} options.change_Address - The change address for the transaction.
   *
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
	async txSend(options, headers, queryParams) {
		try {
			await this.validate();
			await this.validator.txSend(options);

			const endpoint = '/tx/send';

			const requestHeaders = {
				'Authorization': headers.Authorization,
				'Content-Type': headers['Content-Type'],
				'walletID': queryParams.walletId,
			};

			const requestBody = {
				Change_Address: options.change_Address,
				Output_Utxo: options.output_Utxo,
			};

			const response = await this.request.postRequest(endpoint, requestBody, requestHeaders).then((res) => console.log(res)).catch((res) => console.log(res));

			if (response instanceof Error) {
				throw response;
			}

			return response.data;
		} catch (error) {
			throw new Error('Transaction request failed: ' + error);
		}
	}
}

export default Transaction;
