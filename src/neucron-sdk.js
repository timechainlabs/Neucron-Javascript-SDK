import Authentication from './authentication/index.js';
import Pay from './Pay/index.js';
import Wallet from './wallet/index.js';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.wallet = new Wallet(this.authentication);
		this.pay = new Pay(this.authentication);
	}
}

export default NeucronSDK;
