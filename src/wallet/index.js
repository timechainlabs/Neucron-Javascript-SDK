const Request = require('../request.js');
const validator = require('./validator.js');

class Wallet {

  // TODO: write validators && test all these endpoints

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
   * return list of wallets
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllWallet(headers) {
	try {
	  await this.validate();

	  const endpoint = '/wallet/list';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, {});

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }

  /**
   * return list of utxos
   * @param {string} [query.walletId] - walletId of the user he want to run query on if not present then all utxos will return of user.
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllUtxos(headers,query) {
	try {
	  await this.validate();
	  await this.validator.getAllUtxos(query);

	  const endpoint = '/wallet/utxo';

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
}

export default Wallet;
