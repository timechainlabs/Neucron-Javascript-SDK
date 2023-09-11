import Request from '../request.js';
import validator from './validator.js';

class Asset {

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

}

export default Asset;
