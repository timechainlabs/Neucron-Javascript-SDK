import NeucronSDK from "./src/neucron-sdk.js";

const neucronSDK = new NeucronSDK()
const login = await neucronSDK.authentication.login({email: 'nikhilmatta10@gmail.com' , password: '#Nikku478'});

const options = {
  "message": "Hello Rohan & Shubh, Santhosh , Rajapal , Raghu",
  "public_Key": "02be604deaf4aa14950eb1ffd6100fa5b45c4b173a21c7e1afce95a9a3b2e85bea",
  "signature_hex": "30450221009ba07c68ba5c58fa49bd2bf3f272a0f52226cabd90e23647b7409dae778992ad022077fc62cc5e4afe59e281b75125fd1e30f1cc1bc95e7ff089ac058aad99ebe184"
}
const response = await neucronSDK.digitalsignature.verify(options);
// eslint-disable-next-line no-console
console.log(response);
