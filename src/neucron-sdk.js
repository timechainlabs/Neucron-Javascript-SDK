import Authentication from './authentication/index.js';
import Transaction from './Pay/index.js';
import Wallet from './wallet/index.js';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.transaction = new Transaction(this.authentication);
		this.wallet = new Wallet(this.authentication);
	}
}

export default NeucronSDK;
