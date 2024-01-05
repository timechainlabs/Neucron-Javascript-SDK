import Request from '../request.js';
import validator from './validator.js';

class DataIntegrity {
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
   * Function to Upload File on Blockchain [Bitcom]
   *
   * @param {formData} options.upfile - file to upload on blockchain.
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.ContentType - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txFile(options, headers, queryParams) {

	try {

	  await this.validate();

	  await this.validator.txFile(options);

	  const url = '/tx/file';

	  let requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
	  };

	  if (queryParams && queryParams.walletId) {
		requestHeaders = {
		  ...requestHeaders,
		  walletId: queryParams.walletId,
		};
	  }
	  ;

	  const response = await this.request.postRequest(url, options, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

  /**
   * Function to sign message using one of your private key this will return signature and public key
   *
   * @param {string} options.message - message to be sign.
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.ContentType - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txMessageSign(options, headers, queryParams) {

	try {

	  await this.validate();

	  await this.validator.txMeSign(options);

	  const url = '/tx/mesign';

	  let requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
	  };

	  if (queryParams && queryParams.walletId) {
		requestHeaders = {
		  ...requestHeaders,
		  walletId: queryParams.walletId,
		};
	  }
	  ;

	  const response = await this.request.postRequest(url, options, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

  /**
   * Function to post data on blockchain
   *
   * @param {string} options.message - message to post on blockchain.
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txPostData(options, headers, queryParams) {

	try {

	  await this.validate();

	  await this.validator.txPostData(options);

	  let url = '/tx/postdata';

	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken()
	  };

	  if (queryParams && queryParams.walletId) {
		url += '?walletID=' + queryParams.walletId;
	  };

	  const response = await this.request.postRequest(url, options, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

  /**
   * Function to Upload File on 1 Sat Ordinal Blockchain
   *
   * @param {formData} options.upfile - file to upload on blockchain.
   * @param {string} headers.Authorization - The access token for authentication (Authorization header).
   * @param {string} headers.ContentType - The content type of the request (Content-Type header).
   *
   * @param {string} queryParams.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  // Todo: test this endpoint
  async txUpload(options, headers, queryParams) {

	try {

	  await this.validate();

	  await this.validator.txUpload(options);

	  const url = '/tx/upload';

	  let requestHeaders = {
		'Authorization': headers.Authorization,
		'Content-Type': headers['Content-Type'],
	  };

	  if (queryParams && queryParams.walletId) {
		requestHeaders = {
		  ...requestHeaders,
		  walletId: queryParams.walletId,
		};
	  }
	  ;

	  const response = await this.request.postRequest(url, options, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }
}

export default DataIntegrity;
