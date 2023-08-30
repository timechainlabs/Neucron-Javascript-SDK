const validator = require('./validator');
const Request = require('../request');

class Pay{
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

        const url = `/tx/multipayc`;

        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
          walletID: opts.walletID,
        };
    
        const data = {
          Change_Address: opts.Change_Address,
          Input: opts.Input,
          LockTime: opts.LockTime,
          Outputs: opts.Outputs,
        };
    
        const resp = await this.request.postRequest(url, headers, query, data);
    
        if (resp instanceof Error) {
          throw resp;
        }
    
        return resp.data;
        
      }

      /**
   *  payment channel
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

      async tx_payc(opts){

        await this.validate();

        if (!opts) opts = {};
    
        await this.validator.tx_payc(opts);
    
        const url = `/tx/payc`;
    
        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
          walletID: opts.walletID,
        };
    
        const data = {
          amount: opts.amount,
          date: opts.date,
          reciver_address: opts.reciver_address,
          sequence_Num: opts.sequence_Num,
          time: opts.time,
        };
    
        const resp = await this.request.postRequest(url, headers, query, data);
    
        if (resp instanceof Error) {
          throw resp;
        }
    
        return resp.data;

      }

       /**
   *  build multiple P2PKH output
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */

      async tx_spend(opts) {
        await this.validate();
    
        if (!opts) opts = {};
    
        await this.validator.tx_spend(opts);
    
        const url = `/tx/spend`;
    
        const headers = {
          'Content-Type': 'application/json',
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
          walletID: opts.walletID,
        };
    
        const data = {
          change_Address: opts.change_Address,
          output_Utxo: opts.output_Utxo,
        };
    
        const resp = await this.request.postRequest(url, headers, query, data);
    
        if (resp instanceof Error) {
          throw resp;
        }
    
        return resp.data;
      }
}


module.exports = Pay;
