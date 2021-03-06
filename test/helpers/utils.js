// Copyright (c) 2016-2018 Clearmatics Technologies Ltd
// SPDX-License-Identifier: LGPL-3.0+

const crypto = require('crypto')
const Web3 = require('web3');
var web3;

const utils = {};
  // Format required for sending bytes through eth client:
  //  - hex string representation
  //  - prefixed with 0x
utils.bufToStr = b => '0x' + b.toString('hex')

utils.gasPrice = 100000000000 // truffle fixed gas price
utils.joinHex = arr => '0x' + arr.map(el => el.slice(2)).join('')

utils.hexToBytes = (hex) => {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

utils.bytesToHex = (bytes) => {
  for (var hex = [], i = 0; i < bytes.length; i++) {
      hex.push((bytes[i] >>> 4).toString(16));
      hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

utils.sha256 = x =>
  crypto
    .createHash('sha256')
    .update(x)
    .digest()

utils.random32 = () => crypto.randomBytes(32)

utils.randomHex = () => crypto.randomBytes(32).toString('hex');

utils.randomArr = () => {
  const result = []
  const size =(Math.floor(Math.random() * 10) + 1);
  for(let i = size; 0 < i; i-- )
    result.push(randomHex())
  return result
}

utils.isSha256Hash = hashStr => /^0x[0-9a-f]{64}$/i.test(hashStr)

const newSecretHashPair = () => {
  const secret = random32()
  const hash = sha256(secret)
  return {
    secret: bufToStr(secret),
    hash: bufToStr(hash),
  }
}

utils.sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

utils.txGas = txReceipt => txReceipt.receipt.gasUsed * gasPrice
utils.txLoggedArgs = txReceipt => txReceipt.logs[0].args
utils.txContractId = txReceipt => txLoggedArgs(txReceipt).contractId

// Takes a header and private key returning the signed data
// Needs extraData just to be sure of the final byte
utils.signHeader = (headerHash, privateKey, extraData) => {
  const sig = eth_util.ecsign(headerHash, privateKey)
  if (this._chainId > 0) {
    sig.v += this._chainId * 2 + 8
  }

  const pubKey  = eth_util.ecrecover(headerHash, sig.v, sig.r, sig.s);
  const addrBuf = eth_util.pubToAddress(pubKey);

  const newSigBytes = Buffer.concat([sig.r, sig.s]);
  let newSig;

  const bytes = utils.hexToBytes(extraData)
  const finalByte = bytes.splice(bytes.length-1)
  if (finalByte.toString('hex')=="0") {
    newSig = newSigBytes.toString('hex') + '00';
  }
  if (finalByte.toString('hex')=="1") {
    newSig = newSigBytes.toString('hex') + '01';
  }

  return newSig;
}



utils.initWeb3 = (callback, provider) => {
    web3 = new Web3();
    var host = process.env.STANDARD_CONTRACTS_RPC_HOST || "localhost";
    if (provider == null) {
        web3.setProvider(new web3.providers.HttpProvider('http://' + host + ':8545'));
    } else {
        web3.setProvider(provider);
    }
    web3.eth.getAccounts(function (err, accs) {
        if (err)
            return callback(err);
        web3.eth.defaultAccount = accs[0];
        callback();
    });
}

utils.deploy = (ABI, bytecode, callback) => {
    new web3.eth.Contract(ABI, {data: bytecode, gas: "0xFFFFFFFFFFFF"}, function (err, contract) {
        if (err) {
            callback(err);
            // callback fires twice, we only want the second call when the contract is deployed
        } else if (contract.address) {
            callback(null, contract);
        }
    });
}

module.exports = utils;