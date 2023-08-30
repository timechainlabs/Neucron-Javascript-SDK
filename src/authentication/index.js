const Request = require("../request");
const validator = require("./validator");

class Authentication {
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
    if (!this.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
  }


  /**
   * called by client to reset password via recieving email
   * @param {object} opts
   * @return {object}
   **/
  async auth_forgot_password(opts) {
    await this.validator.auth_forgot_password(opts);

    const url = `/auth/forgot_password`;

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const query = {
      email: opts.email
    };
    
    const resp = await this.request.getRequest(url, headers, query, null);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.data;
  }


  /**
   * lets a user login with email and password
   *@param {object} opts
   * @return {object}
   **/
   async auth_login(opts) {
    await this.validator.auth_login(opts);

    const url = `/auth/login`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
       email: opts.email,
       password: opts.password
    };

    const resp = await this.request.postRequest(url, headers, null, data);

    if (resp instanceof Error){

      throw resp;
    } 
    this.setAuthToken(resp.data.token);

    return resp.data;
  }

   /**
   * OTP login/signup
   * @param {object} opts
   * @return {object}
   **/
   async auth_phone(opts) {
    await this.validator.auth_phone(opts);

    const url = `/auth/phone`;

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const query = {
      phone: opts.phone,
      country_code: opts.country_code
    };
    
    const resp = await this.request.postRequest(url, headers, query, null);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.data;
  }

  /**
   * verify auth OTP and get access token
   * @param {object} opts
   * @return {object}
   **/
  async auth_phone_verify(opts) {
    await this.validator.auth_phone_verify(opts);

    const url = `/auth/phone/verify`;

    const headers = {
      'Content-Type': 'application/json',
    };
    
    const query = {
      phone: opts.phone,
      otp: opts.otp
    };
    
    const resp = await this.request.getRequest(url, headers, query, null);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.data;
  }


   /**
   * called by client to update new password
   * @param {object} opts
   * @return {object}
   **/
   async reset_password(opts) {
    await this.validator.reset_password(opts);

    const url = `/auth/reset_password`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      password: opts.password,
      token: opts.token
    };
    
    const resp = await this.request.postRequest(url, headers, null, data);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.data;
  }



  /**
   * Lets a user sign up with email and password
   *@param {object} opts
   * @return {object}
   **/

  async signup(opts) {
    await this.validator.signup(opts);

    const url = `/auth/signup`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      email: opts.email,
      password: opts.password,
    };

    const resp = await this.request.postRequest(url, headers, null, data);

    if (resp instanceof Error) {
      throw resp;
    }

    return resp.data;
  }


  
}
module.exports = Authentication;
