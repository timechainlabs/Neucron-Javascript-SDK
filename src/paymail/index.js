import Request from '../request.js';

class Paymail {

  constructor(auth) {
	this.auth = auth;
	this.request = new Request();
  }

  async validate() {
	if (!this.auth.getAuthToken()) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

 /**
 * Creates a new Paymail for a user.
 * @param {Object} options - The options for Paymail creation.
 * @param {string} options.paymail - The name of the Paymail to be created.
 * @param {string} [options.mnemonic] - The mnemonic to be used for Paymail creation (optional).
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async createPaymail(options) {
	try {
	  await this.validate();
  
	  if (!options.paymail) {
		throw new Error('Paymail Id is required for Paymail creation.');
	  }
  
	  // Define the API endpoint
	  const endpoint = '/wallet/paymail/create';
  
	  // Prepare the request body
	  const requestBody = {};
  
	  // Adjust requestHeaders to include PaymailName in query parameters
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Append PaymailName to the query parameters
	  const queryString = `paymailID=${encodeURIComponent(options.paymail)}`;
	  const requestUrl = `${endpoint}?${queryString}`;
  
	  // Make the POST request to create the Paymail
	  const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the Paymail ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Paymail creation failed: ' + error);
	}
  } 

  /**
   * Lets a user to set default Paymail
   * @param {string} [query.PaymailId] - using this mnemonic user can create an Paymail (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async setDefaultPaymail(query) {

	// TODO: R&D wrong config need to fix from neucron team
	try {
	  await this.validate();

	  const endpoint = '/Paymail/default';

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
 * Updates Paymail for a user.
 * @param {Object} options - The options for Paymail creation.
 * @param {string} options.paymail - The prev paymail .
 * @param {string} options.newPaymail - The new paymail to be update.
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async updatePaymail(options) {
	try {
	  await this.validate();
  
	  // Define the API endpoint
	  const endpoint = '/wallet/paymail/update';
  
	  // Prepare the request body
	  const requestBody = {};
  
	  // Adjust requestHeaders to include PaymailName in query parameters
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Append PaymailName to the query parameters
	  const queryString = `paymailID=${encodeURIComponent(options.paymail)}&newPaymail=${encodeURIComponent(options.newPaymail)}`;
	  const requestUrl = `${endpoint}?${queryString}`;
  
	  // Make the POST request to create the Paymail
	  const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the Paymail ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Paymail creation failed: ' + error);
	}
  } 

  /**
   * get paymail list of user
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getPaymailList() {
	try {
	  await this.validate();

	  let endpoint = '/wallet/paymail/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch transaction history: ' + error);
	}
  }

  /**
   * get Paymail balance if Paymail is not passed then default Paymail balance will be returned
   * @param {string} [options.PaymailId] - using this mnemonic user can create an Paymail (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getPaymailBalance(options) {
	try {
	  await this.validate();

	  let endpoint = '/Paymail/balance';

	  if (options && options.PaymailId){

		endpoint += `?PaymailID=${options.PaymailId}`;
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
   * get Paymail addresses if Paymail is not passed then default Paymail addresses will be returned
   * @param {string} [options.PaymailId] - using this mnemonic user can create an Paymail (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAddressesByPaymailId(options) {
	try {
	  await this.validate();


	  const endpoint = '/Paymail/address';
	  let requestUrl = endpoint;

		let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.PaymailId){
		requestUrl += `?PaymailID=${options.PaymailId}`;
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
   * recover Paymail address using path of that address if Paymail id is not passed then it will take default PaymailId
   * @param {string} [query.PaymailId] - Paymail Id (optional).
   * @param {string} query.path - path of that address you want to recover (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getPaymailAddressByPath(headers,query) {
	// TODO: R&D Pending in Neucron
	try {
	  await this.validate();
	  await this.validator.getPaymailAddressByPath(query);

	  const endpoint = '/Paymail/address/create';

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
   * get keys of corresponding PaymailId if not passed then default Paymail keys will return
   * @param {string} [options.PaymailId] - PaymailId of the user he want to run options on.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getPaymailKeys(options) {
	try {
	  await this.validate();

	  let endpoint = '/Paymail/keys';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.PaymailId){
		endpoint += `?PaymailID=${options.PaymailId}`;
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
   * return list of Paymails
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllPaymail() {
	try {
	  await this.validate();

	  const endpoint = '/Paymail/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.details.Paymails;
	} catch (error) {
	  throw new Error('Unable to fetch Paymail Ids : ' + error);
	}
  }

  /**
   * return list of utxos
   * @param {string} [options.PaymailId] - PaymailId of the user he want to run options on if not present then all utxos will return of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllUtxos(options) {
	try {
	  await this.validate();

	  let endpoint = '/Paymail/utxo';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.PaymailId){
		endpoint += `?PaymailID=${options.PaymailId}`;
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

export default Paymail;
