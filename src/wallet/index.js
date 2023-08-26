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
   async walletaddress(opts) {
    await this.validate();

    if (!opts) opts = {};

    await this.validator.walletaddress(opts);

    const url = `/wallet/address`;

    const headers = {
      authToken: this.auth.authToken,
    };

    if (opts.walletId) headers.walletId = opts.walletId;

    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){

      throw resp;
    } 

    return resp.headers;
  }

   /**
   * get address
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
   async walletaddress_create(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.walletaddress_create(opts);
    const url = `/wallet/address/create`;
    const headers = {
      // authToken: this.auth.authToken,
    };

    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.path) headers.path = opts.path;

    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.headers;
  }

    /**
   * get balance
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
    async walletbalance(opts) {
        await this.validate();
        if (!opts) opts = {};
        await this.validator.walletbalance(opts);
        const url = `/wallet/balance`;
        const headers = {
          // authToken: this.auth.authToken,
        };
        if (opts.walletID) headers.walletID = opts.walletID;

        const resp = await this.request.getRequest(url, headers);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.headers;
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
      // authToken: this.auth.authToken,
    };
    if (opts.mnemonic) headers.mnemonic = opts.mnemonic;

    const resp = await this.request.postRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.headers;
  }

  /**
   * set default wallet
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async walletdefault(opts) {

    await this.validate();

    if (!opts) opts = {};

    await this.validator.walletdefault(opts);

    const url = `/wallet/default`;

    const headers = {
      // authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;

    const resp = await this.request.postRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 
    return resp.headers;
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
      // authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;

    const resp = await this.request.postRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 
    return resp.headers;
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
      // authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;

    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.headers;
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
      // authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);

    if (resp instanceof Error){
      throw resp;
    } 

    return resp.headers;
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
          // authToken: this.auth.authToken,
        };
        if (opts.D) headers.walletID = opts.walletID;

        const resp = await this.request.getRequest(url, headers);

        if (resp instanceof Error){
          throw resp;
        } 
        return resp.headers;
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
          // authToken: this.auth.authToken,
        };
        if (opts.walletID) headers.walletID = opts.walletID;

        const resp = await this.request.getRequest(url, headers);

        if (resp instanceof Error){
          throw resp;
        } 

        return resp.headers;
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
          // authToken: this.auth.authToken,
        };

        if (opts.walletID) headers.walletID = opts.walletID;

        const resp = await this.request.getRequest(url, headers);

        if (resp instanceof Error){
          throw resp;
        } 
        return resp.headers;
      }
}

module.exports = Wallet;