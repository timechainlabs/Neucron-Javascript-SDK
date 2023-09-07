const Request = require('../request.js');
const validator = require('./validator.js');

class Wallet {

  constructor(auth) {
	this.auth = auth;
	this.validator = validator;
	this.request = new Request();
  }

  async validate() {
	if (!this.auth.authToken) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  /**
   * Lets a user to create an wallet
   * @param {string} [query.mnemonic] - using this mnemonic user can create an wallet (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async createWallet(headers,query) {
	try {
	  await this.validate();
	  await this.validator.createWallet(query);

	  const endpoint = '/wallet/create';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const requestBody = {};

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * Lets a user to set default wallet
   * @param {string} [query.walletId] - using this mnemonic user can create an wallet (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async setDefaultWallet(headers,query) {
	try {
	  await this.validate();
	  await this.validator.setDefaultWallet(query);

	  const endpoint = '/wallet/default';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const requestBody = {};

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * get transaction history of corresponding walletId if not passed then default wallet transaction history will return
   * @param {string} [query.walletId] - using this mnemonic user can create an wallet (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletHistory(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getTransactionHistory(query);

	  const endpoint = '/wallet/history';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  if (query && query.walletId){
		requestHeaders = {
		  ...requestHeaders,
		  walletID: query.walletId
		};
	  }

	  const requestBody = {};

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch transaction history: ' + error);
	}
  }

  /**
   * get wallet balance if wallet is not passed then default wallet balance will be returned
   * @param {string} [query.walletId] - using this mnemonic user can create an wallet (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletBalance(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getWalletBalance(query);

	  const endpoint = '/wallet/balance';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, query);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * get wallet addresses if wallet is not passed then default wallet addresses will be returned
   * @param {string} [query.walletId] - using this mnemonic user can create an wallet (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletAddresses(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getWalletAddresses(query);

	  const endpoint = '/wallet/address';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, query);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * recover wallet address using path of that address if wallet id is not passed then it will take default walletId
   * @param {string} [query.walletId] - wallet Id (optional).
   * @param {string} query.path - path of that address you want to recover (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletAddressByPath(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getWalletAddressByPath(query);

	  const endpoint = '/wallet/address/create';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, query);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * get keys of corresponding walletId if not passed then default wallet keys will return
   * @param {string} [query.walletId] - walletId of the user he want to run query on.
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletKeys(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getWalletKeys(query);

	  const endpoint = '/wallet/keys';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  if (query && query.walletId){
		requestHeaders = {
		  ...requestHeaders,
		  walletID: query.walletId
		};
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders, query);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }

  /**
   * return coin & balances
   * @param {object} opts
   * @return {Promise<object>} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async balance(opts) {
	await this.validate();
	if (!opts) opts = {};
	await this.validator.balance(opts);
	const url = '/balance';
	const headers = {
	  authToken: this.auth.authToken,
	};
	if (this.serviceId) headers.serviceId = this.serviceId;
	if (opts.walletId) headers.walletId = opts.walletId;
	if (opts.currency) headers.currency = opts.currency;
	const resp = await this.request.getRequest(url, headers);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }

  /**
   * return all past transactions histories
   * @param {object} opts
   * @return {object}
   **/
  async history(opts) {
	await this.validate();
	if (!opts) opts = {};
	await this.validator.history(opts);
	const url = '/history';
	const headers = {
	  authToken: this.auth.authToken,
	};
	let query;
	if (opts.nextPageToken) query =`nextPageToken=${opts.nextPageToken}`;
	if (this.serviceId) headers.serviceId = this.serviceId;
	if (opts.walletId) headers.walletId = opts.walletId;
	if (opts.type) headers.type = opts.type;
	const resp = await this.request.getRequest(url, headers, undefined, query);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }

  /**
   * list all wallets
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallets(opts) {
	await this.validate();
	if (!opts) opts = {};
	await this.validator.wallets(opts);
	const url = '/wallets';
	const headers = {
	  authToken: this.auth.authToken,
	};
	if (opts.oauth) headers.oauth = opts.oauth;
	if (this.serviceId) headers.serviceId = this.serviceId;
	const resp = await this.request.getRequest(url, headers);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }

  /**
   * return mnemonicPhrase data
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async mnemonic(opts) {
	await this.validate();
	if (!opts) opts = {};
	await this.validator.mnemonic(opts);
	const url = '/mnemonic';
	const headers = {
	  authToken: this.auth.authToken,
	};
	if (this.serviceId) headers.serviceId = this.serviceId;
	if (opts.walletId) headers.walletId = opts.walletId;
	const resp = await this.request.getRequest(url, headers);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }

  /**
   * delete a wallet w.r.t walletId
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async deleteWallet(opts) {
	await this.validate();
	if (!opts) opts = {};
	await this.validator.deleteWallet(opts);
	const url = '/wallet';
	const headers = {
	  authToken: this.auth.authToken,
	};
	if (this.serviceId) headers.serviceId = this.serviceId;
	if (opts.walletId) headers.walletId = opts.walletId;
	const resp = await this.request.deleteRequest(url, headers);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }

  /**
   * get leaderboard of tokenId
   * @param {string} opts - is id of fungible or non-fungible bsv token
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async leaderboard(opts) {
	await this.validator.leaderboard(opts);
	const url = '/leaderboard';
	const headers = {
	  authToken: this.auth.authToken,
	  tokenId: opts.tokenId,
	};
	if (this?.serviceId) headers.serviceId = this.serviceId;
	let query;
	if(opts?.nextPageToken) query = `?nextPageToken=${opts.nextPageToken}`;
	const resp = await this.request.getRequest(url, headers, undefined, query);
	if (resp instanceof Error) throw resp;
	return resp.data;
  }
}

export default Wallet;
