import Request from '../request.js';
import validator from './validator.js';

class Asset {

  // TODO: implement these endpoints {RegisterAsset, ConsolidatedEndpoint}

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

  /**
   * Creates an asset on the Neucron platform.
   * @param {Object} options - The data for the asset creation.
   * @param {string} [queryParams.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async createAsset( options,queryParams) {

	await this.validate();
	await this.validator.assetData(options);

	try {
	  let endpoint = '/asset/create';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (queryParams && queryParams.walletId){
		endpoint += '?walletID=' + queryParams.walletId;
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response.data.details;
	} catch (error) {
	  throw new Error('Asset creation request failed: ' + error.message);
	}
  }



  /**
   * return list of assets
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllAssets() {
	try {
	  await this.validate();

	  const endpoint = '/asset/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data;
	} catch (error) {
	  throw new Error('Unable to fetch wallet Ids : ' + error);
	}
  }

  /**
   * return status of asset
   * @param {string} options.tokenId tokenId of asset you want to fetch status of.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAssetStatus(options) {
	try {

	  await this.validate();
	  await this.validator.assetStatus(options);
	  let endpoint = '/asset/status';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.tokenId){
		endpoint += '?tokenID=' + options.tokenId;
	  }

	  // eslint-disable-next-line no-console
	  console.log(endpoint, requestHeaders);
	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Asset Status : ' + error);
	}
  }

  /**
   * get Tokens by address
   * @param {string} options.address  address of wallet you want to fetch tokens of
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTokensByAddress(options) {
	try {

	  await this.validate();
	  await this.validator.getTokensByAddress(options);
	  let endpoint = '/asset/tokens';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.address){
		endpoint += '?address=' + options.address;
	  }

	  // eslint-disable-next-line no-console
	  console.log(endpoint, requestHeaders);
	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Tokens from this address : ' + error);
	}
  }

  /**
   * get Tokens by walletId
   * @param {string} [options.walletId]  walletId they belong to if no walletId is provided then it will default walletId
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTokensByWalletId(options) {
	try {

	  await this.validate();
	  let endpoint = '/asset/tokens/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId){
		endpoint += '?walletID=' + options.walletId;
	  }

	  // eslint-disable-next-line no-console
	  console.log(endpoint, requestHeaders);
	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to process you request at this moment : ' + error);
	}
  }

  /**
   * Transfer Asset .
   * @param {Object} options - The data for the asset creation.
   * @param {string} [queryParams.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAsset( options,queryParams) {

	await this.validate();
	await this.validator.transferAsset(options);

	// TODO: test this endpoint

	try {
	  let endpoint = '/asset/transfer';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (queryParams && queryParams.walletId){
		endpoint += '?walletID=' + queryParams.walletId;
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Asset creation request failed: ' + error.message);
	}
  }

  /**
   * Transfer All Assets .
   * @param {Object} options - The data for the asset creation.
   * @param {string} [queryParams.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAllAssets( options,queryParams) {
	// TODO: test this endpoint
	await this.validate();
	await this.validator.transferAllAssets(options);

	try {
	  let endpoint = '/asset/transfer/address';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (queryParams && queryParams.walletId){
		endpoint += '?walletID=' + queryParams.walletId;
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Asset processing failed: ' + error.message);
	}
  }

  /**
 * Register a new asset on the Neucron platform.
 * @param {Object} assetData - The data for the asset registration.
 * @throws {Error} Throws an error if the registration request fails.
 * @return {Object} The response data if successful.
 */
async registerAsset(assetData) {
	try {
	  // Perform authentication and data validation as needed
	  await this.validate();
	  await this.validator.assetData(assetData);
  
	  // Define the endpoint for the registration request
	  let endpoint = '/asset/register';
  
	  // Set up request headers with the authentication token
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Make the HTTP POST request
	  const response = await this.request.postRequest(endpoint, assetData, requestHeaders);
  
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the response data
	  return response.data;
	} catch (error) {
	  throw new Error('Asset registration request failed: ' + error.message);
	}
  }
  
}

export default Asset;
