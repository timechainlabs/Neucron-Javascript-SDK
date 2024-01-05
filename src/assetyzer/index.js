import Request from '../request.js';

class Assetyzer {

  // TODO: implement these endpoints {RegisterAssetyzer, ConsolidatedEndpoint}

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
   * Creates an Assetyzer on the Neucron platform.
   * @param {Object} options - The data for the Assetyzer creation.
   * @param {string} assetType - The type of the asset.
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async createAsset(options,queryParams) {

	await this.validate();

	try {
	  let endpoint = '/asset/register';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (queryParams && queryParams.assetType){
		endpoint += '?assetType=' + queryParams.assetType;
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response.data;
	} catch (error) {
	  throw new Error(error.message);
	}
  }

  /**
   * Creates an Assetyzer on the Neucron platform.
   * @param {Object} options - The data for the Assetyzer creation.
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async send(options) {

	await this.validate();

	try {
	  let endpoint = '/asset/send';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.assetId){
		endpoint += '?assetID=' + options.assetId;
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error(error.message);
	}
  }

  /**
   * return list of Assets
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllAssets() {
	try {
	  await this.validate();

	  const endpoint = '/asset/assetlist';

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
   * deploy asset on chain
   * @param {string} options.assetId assetId of Asset you want to deploy.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async deploy(options) {
	try {

	  await this.validate();
	  let endpoint = '/asset/deploy';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.assetId){
		endpoint += '?assetID=' + options.assetId;
	  }

      console.log(endpoint, requestHeaders);
	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Assetyzer Status : ' + error);
	}
  }


    /**
   * get asset detail by id
   * @param {string} options.assetId assetId of Asset you want to get detail of.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async getAssetDetailById(options) {
        try {
    
          await this.validate();
          let endpoint = '/asset/detail';
    
          let requestHeaders = {
            Authorization: this.auth.getAuthToken()
          };
    
          if (options && options.assetId){
            endpoint += '?assetID=' + options.assetId;
          }

          const response = await this.request.getRequest(endpoint, requestHeaders);
    
          if (response instanceof Error) {
            throw response;
          }
          return response;
        } catch (error) {
          throw new Error('Unable to fetch Assetyzer Status : ' + error);
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
	  let endpoint = '/Assetyzer/tokens';

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
	  let endpoint = '/Assetyzer/tokens/list';

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
   * Transfer Assetyzer .
   * @param {Object} options - The data for the Assetyzer creation.
   * @param {string} [queryParams.walletId] - The data for the Assetyzer creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAssetyzer( options,queryParams) {

	await this.validate();
	await this.validator.transferAssetyzer(options);

	// TODO: test this endpoint

	try {
	  let endpoint = '/Assetyzer/transfer';

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
	  throw new Error('Assetyzer creation request failed: ' + error.message);
	}
  }

  /**
   * Transfer All Assetyzers .
   * @param {Object} options - The data for the Assetyzer creation.
   * @param {string} [queryParams.walletId] - The data for the Assetyzer creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAllAssetyzers( options,queryParams) {
	// TODO: test this endpoint
	await this.validate();
	await this.validator.transferAllAssetyzers(options);

	try {
	  let endpoint = '/Assetyzer/transfer/address';

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
	  throw new Error('Assetyzer processing failed: ' + error.message);
	}
  }
}

export default Assetyzer;
