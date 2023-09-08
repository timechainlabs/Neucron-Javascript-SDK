import Authentication from './authentication/index.js';
import Transaction from './Pay/index.js';
import SmartContracts from './SmartContracts/index.js';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.transaction = new Transaction(this.authentication.getAuthToken());
		this.smartContract = new SmartContracts(this.authentication.getAuthToken());
	}
}

export default NeucronSDK;
