const Authentication = require('./authentication');
const Data_Integrity = require('./Data Integrity');
const Pay = require('./Pay');
const SmartContracts = require('./SmartContracts');
const Wallet = require('./wallet');





class NeucronSDK {
  constructor(config) {
    this.authentication = new Authentication(config);

    this.data_Integrity = new Data_Integrity(this.authentication.auth);
    this.pay = new Pay(this.authentication.auth);
     this.smartContracts = new SmartContracts(this.authentication.auth);

    this.wallet = new Wallet(this.authentication.auth);
  }
}

module.exports = NeucronSDK;
