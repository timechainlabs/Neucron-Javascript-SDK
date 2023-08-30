const Request = require('../request');
const validator = require('./validator');

class Wallet {
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
   * get wallet address
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
   async wallet_address(opts) {
    await this.validate();

    if (!opts) opts = {};

    await this.validator.wallet_address(opts);

    const url = `/wallet/address`;

    const headers = {
      
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };
    
    const query = {

      walletID: opts.walletID
    };

    

    const resp = await this.request.getRequest(url, headers, query, null, null);

    if (resp instanceof Error){

      throw resp;
    } 

    return resp.data;
  }

   /**
   * get address
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
   async wallet_address_create(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.wallet_address_create(opts);
    const url = `/wallet/address/create`;
    
    const headers = {
      
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };


    const query = {

      walletID: opts.walletID,
      path: opts.path
    };
   
     

    const resp = await this.request.getRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.data;
  }

    /**
   * get balance
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
    async wallet_balance(opts) {
        await this.validate();
        if (!opts) opts = {};
        await this.validator.wallet_balance(opts);
        const url = `/wallet/balance`;
        

        const headers = {
          
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };

        const query = {

          walletID: opts.walletID,
        
        };
        

        const resp = await this.request.getRequest(url, headers, query, null, null);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.data;
      }

   /**
   * return mnemonicPhrase data for creation of wallet
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallet_create(opts) {
    await this.validate();

    if (!opts) opts = {};

    await this.validator.wallet_create(opts);


    const url = `/wallet/create`;

    const headers = {
          
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const query = {

      mnemonic: opts.mnemonic,
    
    };
    

    const resp = await this.request.postRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.data;
  }

  /**
   * set default wallet
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallet_default(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.walletdefault(opts);

    const url = `/wallet/default`;

   
    const headers = {
          
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const query = {

      walletID: opts.walletID
    
    };

    const resp = await this.request.postRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 
    return resp.data;
  }

  /**
   * get transaction history of wallet
   * @param {object} opts
   * @return {object}
   **/
  async wallet_history(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.wallet_history(opts);

    const url = `/wallet/history`;
  
    const headers = {
          
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const query = {

      walletID: opts.walletID
    
    };

    const resp = await this.request.postRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 
    return resp.data;
  }

  /**
   * get keys
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallet_keys(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.wallet_keys(opts);

    const url = `/wallet/keys`;

    const headers = {
          
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const query = {

      walletID: opts.walletID
    
    };

    const resp = await this.request.getRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.data;
  }

  /**
   * get list of wallets
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallet_list(opts) {
    await this.validate();

    if (!opts) opts = {};

    await this.validator.wallet_list(opts);

    const url = `/wallet/list`;

    const headers = {
          
      'X_Neucron_App_ID': opts.X_Neucron_App_ID,
      'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
      'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
      'X_Neucron_User_ID': opts.X_Neucron_User_ID,
    };

    const resp = await this.request.getRequest(url, headers, query, null, null);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.data;
  }

    /**
   * get mnemonic
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
    async wallet_mnemonic(opts) {

        await this.validate();

        if (!opts) opts = {};

        await this.validator.wallet_mnemonic(opts);

        const url = `/wallet/mnemonic`;

        const headers = {
          
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
    
          walletID: opts.walletID
        
        };

        const resp = await this.request.getRequest(url, headers, query, null, null);

        if (resp instanceof Error){
          throw resp;
        } 
        return resp.data;
      }

   /**
   * get utxo
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
    async wallet_utxo(opts) {
        await this.validate();

        if (!opts) opts = {};

        await this.validator.wallet_utxo(opts);

        const url = `/wallet/utxo`;

        const headers = {
          
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
    
          walletID: opts.walletID
        
        };

        const resp = await this.request.getRequest(url, headers, query, null, null);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.data;
      }

   /**
   * get x pubkey
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
    async wallet_xpubkeys(opts) {
        await this.validate();

        if (!opts) opts = {};

        await this.validator.wallet_xpubkeys(opts);

        const url = `/wallet/xpubkeys`;

        const headers = {
          
          'X_Neucron_App_ID': opts.X_Neucron_App_ID,
          'X_Neucron_Key_ID': opts.X_Neucron_Key_ID,
          'X_Neucron_Key_Secret': opts.X_Neucron_Key_Secret,
          'X_Neucron_User_ID': opts.X_Neucron_User_ID,
        };
    
        const query = {
    
          walletID: opts.walletID
        
        };

        const resp = await this.request.getRequest(url, headers, query, null, null);

        if (resp instanceof Error){
          throw resp;
        } 
        return resp.data;
      }
}

module.exports = Wallet;