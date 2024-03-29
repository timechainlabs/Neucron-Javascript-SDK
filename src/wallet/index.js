import Request from '../request.js';
import validator from '../wallet/validator.js';

class Wallet {

  constructor(auth) {
	this.auth = auth;
	this.validator = validator;
	this.request = new Request();
  }

  async validate() {
	if (!this.auth.getAuthToken()) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  //TODO: Implement these endpoints: { xPubKeys, setDefaultWallet, getMnemonic}

/**
 * Creates a new wallet for a user.
 * @param {Object} options - The options for wallet creation.
 * @param {string} options.walletName - The name of the wallet to be created.
 * @param {string} [options.mnemonic] - The mnemonic to be used for wallet creation (optional).
 * @throws {Error} Throws an error if the wallet creation request fails.
 * @return {string} The wallet ID if creation is successful.
 */
async createWallet(options) {
	try {
	  // Validate the SDK state
	  await this.validate();
  
	  // Ensure the walletName is provided
	  if (!options.walletName) {
		throw new Error('Wallet name is required for wallet creation.');
	  }
  
	  // Define the API endpoint
	  const endpoint = '/wallet/create';
  
	  // Prepare the request body
	  const requestBody = {};
  
	  // Adjust requestHeaders to include walletName in query parameters
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Append walletName to the query parameters
	  const queryString = `walletName=${encodeURIComponent(options.walletName)}`;
	  const requestUrl = `${endpoint}?${queryString}`;
  
	  // Make the POST request to create the wallet
	  const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the wallet ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Wallet creation failed: ' + error);
	}
  }
  

  /**
   * Lets a user to set default wallet
   * @param {string} [query.walletId] - using this mnemonic user can create an wallet (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async setDefaultWallet(query) {

	// TODO: R&D wrong config need to fix from neucron team
	try {
	  await this.validate();

	  const endpoint = '/wallet/default';

	  const requestBody = {};

	  const response = await this.request.postRequest(endpoint, requestBody, query);

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
   * @param {string} [options.walletId] - using this mnemonic user can create an wallet (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletHistory(options) {
	try {
	  await this.validate();

	  let endpoint = '/wallet/history';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId){

		endpoint += `?walletID=${options.walletId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.history;
	} catch (error) {
	  throw new Error('Unable to fetch transaction history: ' + error);
	}
  }

  /**
   * get wallet balance if wallet is not passed then default wallet balance will be returned
   * @param {string} [options.walletId] - using this mnemonic user can create an wallet (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletBalance(options) {
	try {
	  await this.validate();

	  let endpoint = '/wallet/balance';

	  if (options && options.walletId){

		endpoint += `?walletID=${options.walletId}`;
	  }

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);
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
   * @param {string} [options.walletId] - using this mnemonic user can create an wallet (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAddressesByWalletId(options) {
	try {
	  await this.validate();


	  const endpoint = '/wallet/address';
	  let requestUrl = endpoint;

		let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId){
		requestUrl += `?walletID=${options.walletId}`;
	  }

	  const response = await this.request.getRequest(requestUrl, requestHeaders);
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
	// TODO: R&D Pending in Neucron
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
   * @param {string} [options.walletId] - walletId of the user he want to run options on.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getWalletKeys(options) {
	try {
	  await this.validate();

	  let endpoint = '/wallet/keys';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId){
		endpoint += `?walletID=${options.walletId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.keys;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }

  /**
   * return list of wallets
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllWallet() {
	try {
	  await this.validate();

	  const endpoint = '/wallet/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.details.Wallets;
	} catch (error) {
	  throw new Error('Unable to fetch wallet Ids : ' + error);
	}
  }

  /**
   * return list of utxos
   * @param {string} [options.walletId] - walletId of the user he want to run options on if not present then all utxos will return of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllUtxos(options) {
	try {
	  await this.validate();

	  let endpoint = '/wallet/utxo';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId){
		endpoint += `?walletID=${options.walletId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.list;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }
}

export default Wallet;
