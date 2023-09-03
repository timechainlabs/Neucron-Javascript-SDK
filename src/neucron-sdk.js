import Authentication from './authentication';
import Wallet from './wallet';
import Transaction from './Pay/index';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.transaction = new Transaction(this.authentication.getAuthToken()),
		this.wallet = new Wallet(this.authentication.getAuthToken());
	}
}

export default NeucronSDK;
