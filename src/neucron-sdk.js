const Authentication = require('./authentication');
// const App = require('./app');
// const User = require('./user');
const Wallet = require('./wallet');
// const FeeManager = require('./feeManager');
// const Utility = require('./utility');
// const Paymail = require('./paymail');
// const Notifications = require('./notifications');
// const Delete = require('./delete');
// const Contracts = require('./contracts');
const Transaction = require('./transaction');

class NeucronSDK {
  constructor(config) {
    this.authentication = new Authentication(config);

    // this.app = new App(config);
    // this.contracts = new Contracts(this.authentication.auth, config?.serviceId);
    // this.delete = new Delete(this.authentication.auth, config?.serviceId);
    // this.feeManager = new FeeManager(this.authentication.auth, config?.serviceId);
    // this.notification = new Notifications(this.authentication.auth, config?.serviceId);

   
    
    this.transaction = new Transaction(this.authentication.auth),

    // this.user = new User(this.authentication.auth, config?.serviceId);
    // this.utility = new Utility(this.authentication.auth, config?.serviceId);

    this.wallet = new Wallet(this.authentication.auth);
  }
}

module.exports = NeucronSDK;
