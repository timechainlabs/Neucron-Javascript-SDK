import Authentication from './authentication/index.js';
import Pay from './Pay/index.js';
import Wallet from './wallet/index.js';
import SmartContracts from './smart-contracts/index.js';
import DataIntegrity from './data-integrity/index.js';
import Asset from './asset/index.js';
import Metanet from './metanet/index.js'; 
import MetanetAPI from './metanet/index.js';

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.wallet = new Wallet(this.authentication);
		this.pay = new Pay(this.authentication);
		this.smartContracts = new SmartContracts(this.authentication);
		this.dataIntegrity = new DataIntegrity(this.authentication);
		this.asset = new Asset(this.authentication);
		this.metanet = new MetanetAPI(this.authentication);
		
	}
}

export default NeucronSDK;
