const Request = require('../request');
const validator = require('./validator');

class SmartContracts {
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
   * write custom locking script
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async tx_asm(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.tx_asm(opts);

    const url = `/tx/asm`;

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
    const data={
        satoshi: opts.satoshi,
        script: opts.script,
    };


    const resp = await this.request.postRequest(url, headers, query, data);

    if (resp instanceof Error){
      throw resp;
    } 
    return resp.data;
  }
  
    /**
   * multiple contract spending
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async tx_multiple(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.tx_multiple(opts);

    const url = `/tx/multiple`;


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
        Flag: opts.Flag,
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

  

}

module.exports = SmartContracts;