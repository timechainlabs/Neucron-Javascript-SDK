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
   * upload large file on Blockchain Bitcom
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

    async tx_file(opts) {

        await this.validate();

        await this.validator.tx_file(opts);

        const url = `/tx/file`;

        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };

        const query ={
          walletID: opts.walletID,
        };

        const formData = {
          upfile: opts.upfile,
        };


        const resp = await this.request.postRequest(url, headers, query, null, formData);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.data;
      }

   /**
   * Signed by one of your wallet private key
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

    async tx_mesign(opts) {
        await this.validate();

        await this.validator.tx_mesign(opts);

        const url = `/tx/mesign`;

        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };

        const query ={
          walletID: opts.walletID,
        };

        const data ={
          message: opts.message,
        };

        const resp = await this.request.postRequest(url, headers, query, data);

        if (resp instanceof Error){
          throw resp;
        }

        return resp.data;
      }



   /**
   * upload data on blockchain
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

    async tx_postdata(opts) {

        await this.validate();

        await this.validator.tx_postdata(opts);

        const url = `/tx/postdata`;

        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };

        const query ={
          walletID: opts.walletID,
        };

        const data ={
          message: opts.message,
        };

        const resp = await this.request.postRequest(url, headers, query, data);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.data;
      }

  /**
   * upload file on blockchain 1 setordinal
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async tx_upload(opts) {

    await this.validate();

    await this.validator.tx_upload(opts);

    const url = `/tx/upload`;

    const headers = {
      'Content-Type': 'application/json',
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const query ={
      walletID: opts.walletID,
    };

    const formData = {
      upfile: opts.upfile,
    };


    const resp = await this.request.postRequest(url, headers, query, null, formData);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.data;
  }
}

module.exports = Transaction;