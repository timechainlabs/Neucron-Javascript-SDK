import Request from '../request.js';

class DigitalSignature {

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
 * sign a message .
 * @param {Object} options - The options for signing message.
 * @param {string} options.message - message which needs to be sign.
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async signature(options) {
	try {
	  await this.validate();
  
	  // Define the API endpoint
	  const endpoint = '/tx/mesign';
  
	  // Prepare the request body
	  const requestBody = {
        message: options.message
      };
  
	  // Adjust requestHeaders to include PaymailName in query parameters
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Make the POST request to create the Paymail
	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
  
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
 * sign a message .
 * @param {Object} options - The options for signing message.
 * @param {string} options.message - message which needs to be sign.
 * @param {string} options.public_Key - public key of signed message
 * @param {string} options.signature_hex - signature hex of signed message
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async verify(options) {
	try {
	  await this.validate();
  
	  // Define the API endpoint
	  const endpoint = '/tx/meverify';
  
	  // Prepare the request body
	  const requestBody = {
        message: options.message,
        public_Key: options.public_Key,
        signature_hex: options.signature_hex
      };
  
	  // Adjust requestHeaders to include PaymailName in query parameters
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Make the POST request to create the Paymail
	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the Paymail ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Verification failed: ' + error);
	}
  }

}

export default DigitalSignature;
