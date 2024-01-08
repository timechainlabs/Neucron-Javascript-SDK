import Request from '../request.js';

class DataIntegrity {
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
   * Function to Upload File on Blockchain [Bitcom]
   *
   * @param {formData} options.upfile - file to upload on blockchain.
   * @param {string} options.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txFile(options) {

	try {

	  await this.validate();

	  let url = '/tx/file';

	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken(),
		'accept': 'application/json',
		'Content-Type': 'multipart/form-data',
	  };

	  const formData = options.upfile;


	  if (options && options.walletId) {
		url = url + '?walletID=' + options.walletId
	  };

	  console.log(url, options, requestHeaders);

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
   * @param {string} options.walletId - The ID of the wallet associated with the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txMessageSign(options) {

	try {

	  await this.validate();

	  const url = '/tx/mesign';

	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken(),
		'accept': 'application/json'
	  };

	  if (options && options.walletId) {
		url = url + '?walletID=' + options.walletId
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
   * Function to post data on blockchain
   *
   * @param {string} options.message - message to post on blockchain.
   * @param {string} options.walletId - The ID of the wallet associated with the transaction.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txPostData(options) {

	try {

	  await this.validate();

	  let url = '/tx/postdata';

	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken(),
		'accept': 'application/json'
	  };

	  if (options && options.walletId) {
		url += '?walletID=' + options.walletId;
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
 * @param {Object} options.upfile - File to upload on the blockchain.
 * @param {string} options.walletId - The ID of the wallet associated with the transaction.
 *
 * @throws {Error} Throws an error if the transaction request fails.
 * @return {Object} The headers of the response if successful.
 */
async txUpload(options) {
	try {
	  await this.validate();
  
	  let url = '/tx/upload'; // Use let instead of const for reassignment
  
	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken(),
		'accept': 'application/json',
		'Content-Type': 'multipart/form-data',
	  };
  
	  const formData = options.upfile;
  
	  if (options && options.walletId) {
		url += `?walletID=${options.walletId}`; // Append walletID to the URL
	  }

	  console.log(url, formData, requestHeaders)
  
	  const response = await this.request.postRequest(url, formData, requestHeaders);
	  
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
