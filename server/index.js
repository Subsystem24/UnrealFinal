const config = require('./config.json');
const BoxSDK = require('box-node-sdk');

const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getAppAuthClient('users');

console.log(client);
