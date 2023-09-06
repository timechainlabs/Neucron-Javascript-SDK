import Authentication from './authentication';
import Wallet from './wallet';
import Transaction from './Pay/index';
import SmartContracts from './SmartContracts';
import DataIntegrity from './DataIntegrity';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.transaction = new Transaction(this.authentication.getAuthToken());
		this.wallet = new Wallet(this.authentication.getAuthToken());
		this.smartContract = new SmartContracts(this.authentication.getAuthToken());
		this.dataIntegrity = new DataIntegrity(this.authentication.getAuthToken());
	}
}

export default NeucronSDK;
