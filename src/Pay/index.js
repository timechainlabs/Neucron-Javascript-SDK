const validator = require('./validator');
const Request = require('../request');

class Transaction{
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
   * multiple payment channel
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

    async tx_multipayc(opts) {

        await this.validate();

        await this.validator.tx_multipayc(opts);

        const url = `/tx/multipay`;

        const headers = {
          // authToken: this.auth.authToken,
          walletID: opts.walletID,
          upfile: opts.upfile,
        };

        const resp = await this.request.postRequest(url, headers);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.headers;
      }
}
