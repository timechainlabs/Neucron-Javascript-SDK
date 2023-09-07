import Request from '../request.js';

import validator from './validator.js';

class Authentication {

  // TODO: Test these endpoints
  constructor(config) {
	this.authToken = config?.authToken;
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
	if (!this.authToken) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  /**
   * Lets a user sign up with email and password.
   * @param {string} options.password - password of user.
   * @param {string} options.email - email of user.
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async signUp(options, headers) {
	try {
	  await this.validate();
	  await this.validator.signup(options);

	  const endpoint = '/auth/signup';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const requestBody = {
		email: options.email,
		password: options.password,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  this.setAuthToken(response.data.access_token);
	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * Lets a user login with email and password.
   * @param {string} options.password - password of user.
   * @param {string} options.email - email of user.
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async login(options, headers) {
	try {
	  await this.validate();
	  await this.validator.login(options);

	  const endpoint = '/auth/login';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const requestBody = {
		email: options.email,
		password: options.password,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  this.setAuthToken(response.data.access_token);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * Lets a user to reset password using token received on email
   * @param {string} options.password - password of user.
   * @param {string} options.token - token user get on email.
   * @param {string} headers.ContentType - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async resetPassword(options, headers) {
	try {
	  await this.validate();
	  await this.validator.resetPassword(options);

	  const endpoint = '/auth/login';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const requestBody = {
		email: options.email,
		password: options.password,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  this.setAuthToken(response.data.access_token);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * create token and send to user respective emailId
   * @param {string} options.password - password of user.
   * @param {string} options.token - token user get on email.
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async forgetPassword(headers, queryParams) {
	try {
	  await this.validate();
	  await this.validator.validateQueryParamsOfForgotPassword(queryParams);

	  const endpoint = '/auth/forgot_password';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, queryParams);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * Lets a user signup/login using phone number
   * @param {string} options.phone - phone number of user.
   * @param {string} options.country_code - country code of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async phone(query) {
	try {
	  await this.validate();
	  await this.validator.phone(query);

	  const endpoint = '/auth/forgot_password';

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
   * Signup/login using phone number and send OTP if user doesnt exist then it will create fresh account
   * @param {string} query.phone - phone number of user.
   * @param {string} query.country_code - country code of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   **/
  async sendOtp(query) {
	await this.validator.phone(query);

	const url = '/auth/phone';

	const headers = {
	  phone: query.phone,
	  countryCode: query.country_code,
	};

	const resp = await this.request.postRequest(url, {}, headers);

	if (resp instanceof Error) {

	  throw resp;
	}
	return resp.headers;
  }

  /**
   * verify phone number using otp
   * @param {string} query.phone - phone number of user.
   * @param {string} query.otp - otp received by user over phone number.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   **/
  async verifyPhoneNo(query) {
	await this.validator.verifyPhoneNo(query);

	const url = '/auth/phone';

	const headers = {
	  phone: query.phone,
	  otp: query.otp,
	};

	const resp = await this.request.postRequest(url, {}, headers);

	if (resp instanceof Error) {

	  throw resp;
	}
	return resp.headers;
  }

}

export default Authentication;
