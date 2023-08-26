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
   * Lets a user sign up with email and password
   *@param {object} opts
   * @return {object}
   **/
  async signup(opts) {
    await this.validator.signup(opts);

    const url = `/auth/signup`;

    const data = {
      email: opts.email,
      password: opts.password,
    };

    const resp = await this.request.postRequest(url, data);
    
    if (resp instanceof Error) {
      throw resp;
    }

    this.setAuthToken(resp.data.token);
    return resp.data;
  }

  /**
   * lets a user login with email and password
   *@param {object} opts
   * @return {object}
   **/
  async login(opts) {
    await this.validator.login(opts);

    const url = `/auth/login`;

    const data = {
       email: opts.email,
       password: opts.password
    };

    const resp = await this.request.postRequest(url, data);

    if (resp instanceof Error){

      throw resp;
    } 
    this.setAuthToken(resp.data.token);

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

    const data = {
      password: opts.password,
      token: opts.token
    };
    
    const resp = await this.request.postRequest(url, data);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.data;
  }

  /**
   * called by client to reset password via recieving email
   * @param {object} opts
   * @return {object}
   **/
  async forgot_password(opts) {
    await this.validator.forgot_password(opts);

    const url = `/auth/forgot_password`;
    
    const headers = {
      email: opts.email
    };
    
    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.headers;
  }

  /**
   * OTP login/signup
   * @param {object} opts
   * @return {object}
   **/
  async phone(opts) {
    await this.validator.phone(opts);

    const url = `/auth/phone`;
    
    const headers = {
      phone: opts.phone,
      country_code: opts.country_code
    };
    
    const resp = await this.request.postRequest(url, headers);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.headers;
  }

  /**
   * verify auth OTP and get access token
   * @param {object} opts
   * @return {object}
   **/
  async verify(opts) {
    await this.validator.verify(opts);

    const url = `/auth/phone/verify`;
    
    const headers = {
      phone: opts.phone,
      OTP: opts.OTP
    };
    
    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){

      throw resp;
    } 
    return resp.headers;
  }
}
module.exports = Authentication;
