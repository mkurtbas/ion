const assert = require('assert');
const path = require('path');
const utils = require('./helpers/utils.js');
const async = require('async');

const bytecode = "608060405234801561001057600080fd5b5061117b806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80638c9d0f9e14610030575b600080fd5b6102216004803603608081101561004657600080fd5b810190808035906020019064010000000081111561006357600080fd5b82018360208201111561007557600080fd5b8035906020019184600183028401116401000000008311171561009757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156100fa57600080fd5b82018360208201111561010c57600080fd5b8035906020019184600183028401116401000000008311171561012e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561019157600080fd5b8201836020820111156101a357600080fd5b803590602001918460018302840111640100000000831117156101c557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061023b565b604051808215151515815260200191505060405180910390f35b60008061024a86868686610293565b90507f0b3bdb70bcb1393d4319be3261bd6ab95e2ea1665e718029d24cecca39e84ccc81604051808215151515815260200191505060405180910390a180915050949350505050565b600061029d6110d0565b6102a6856103ca565b905060606102b382610427565b90506000849050600080905060606102cc8860006104de565b905060008090505b84518110156103b7576102f98582815181106102ec57fe5b60200260200101516107f8565b80519060200120841461031557600096505050505050506103c2565b606061033386838151811061032657fe5b6020026020010151610427565b90506011815114156103585761034b8185858f610857565b809550819650505061038c565b60028151141561037b5761036e8185858f61095a565b809550819650505061038b565b60009750505050505050506103c2565b5b6000801b8514156103a957600184149750505050505050506103c2565b5080806001019150506102d4565b506000955050505050505b949350505050565b6103d26110d0565b6000825190506000811415610400576040518060400160405280600081526020016000815250915050610422565b6000602084019050604051806040016040528082815260200183815250925050505b919050565b606061043282610a50565b61043b57600080fd5b600061044683610a82565b90508060405190808252806020026020018201604052801561048257816020015b61046f6110ea565b8152602001906001900390816104675790505b50915061048d611104565b61049684610afa565b905060005b6104a482610b40565b156104d6576104b282610b6a565b8482815181106104be57fe5b6020026020010181905250808060010191505061049b565b505050919050565b60608060ff6040519080825280601f01601f1916602001820160405280156105155781602001600182028038833980820191505090505b509050600080905060008090505b855181101561073f57610534611124565b61055387838151811061054357fe5b602001015160f81c60f81b610bc7565b90508580156105625750600082145b1561068757600160f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168160006002811061059b57fe5b60200201517effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806106265750600360f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916816000600281106105fd57fe5b60200201517effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610682578060016002811061063857fe5b6020020151848460ff168151811061064c57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001830192505b610731565b8060006002811061069457fe5b6020020151848460ff16815181106106a857fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806001600281106106e457fe5b6020020151846001850160ff16815181106106fb57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506002830192505b508080600101915050610523565b5060608160ff166040519080825280601f01601f1916602001820160405280156107785781602001600182028038833980820191505090505b50905060008090505b8260ff168110156107eb5783818151811061079857fe5b602001015160f81c60f81b8282815181106107af57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610781565b5080935050505092915050565b6060600082602001519050806040519080825280601f01601f1916602001820160405280156108365781602001600182028038833980820191505090505b509150600081146108515761085083600001518383610c8f565b5b50919050565b60008083518514156108ae57600061088b846108868960108151811061087957fe5b60200260200101516107f8565b610cd1565b610896576000610899565b60015b8160001b91508060ff16905091509150610951565b60006108cf8587815181106108bf57fe5b602001015160f81c60f81b610cec565b90506108d96110d0565b878260ff16815181106108e857fe5b6020026020010151905060018701965060006020610905836107f8565b5110156109255761091882898989610cf9565b8099508192505050610947565b610944898460ff168151811061093757fe5b6020026020010151610d64565b90505b8088945094505050505b94509492505050565b600080606061097c8760008151811061096f57fe5b6020026020010151610d79565b90506109898160016104de565b518601955084518614156109e35760006109bf856109ba8a6001815181106109ad57fe5b6020026020010151610d79565b610cd1565b6109ca5760006109cd565b60015b8160001b91508060ff1690509250925050610a47565b60006109f08260016104de565b511415610a0d576000808160001b91508090509250925050610a47565b6060610a2c88600181518110610a1f57fe5b6020026020010151610d79565b90506000610a3b826000610de9565b90508088945094505050505b94509492505050565b60008082602001511415610a675760009050610a7d565b60008260000151905060c0815160001a10159150505b919050565b6000610a8d82610a50565b610a9a5760009050610af5565b60008083600001519050805160001a91506000610ab685610e5e565b82019050600060018660200151840103905060005b818311610aec57610adb83610ef0565b830192508080600101915050610acb565b80955050505050505b919050565b610b02611104565b610b0b82610a50565b610b1457600080fd5b6000610b1f83610e5e565b83600001510190508282600001819052508082602001818152505050919050565b6000610b4a6110d0565b826000015190508060200151816000015101836020015110915050919050565b610b726110d0565b610b7b82610b40565b15610bbd576000826020015190506000610b9482610ef0565b905081836000018181525050808360200181815250508082018460200181815250505050610bc2565b600080fd5b919050565b610bcf611124565b6000610bdc836004610f8a565b90506000600f60f81b841690506040518060400160405280837effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681525092505050919050565b6020601f820104836020840160005b83811015610cbe5760208102808401518184015250600181019050610c9e565b5060008551602001860152505050505050565b60008180519060200120838051906020012014905092915050565b60008160f81c9050919050565b6000806060610d0787610427565b9050601181511415610d2957610d1f81878787610857565b9250925050610d5b565b600281511415610d4957610d3f8187878761095a565b9250925050610d5b565b6000808160001b915080905092509250505b94509492505050565b6000610d6f82610fb3565b60001b9050919050565b6060610d8482611012565b610d8d57600080fd5b600080610d9984611043565b8092508193505050806040519080825280601f01601f191660200182016040528015610dd45781602001600182028038833980820191505090505b509250610de2828483610c8f565b5050919050565b60008060008090505b6020811015610e53576008810260ff60f81b8683870181518110610e1257fe5b602001015160f81c60f81b167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901c821791508080600101915050610df2565b508091505092915050565b60008082602001511415610e755760009050610eeb565b60008083600001519050805160001a91506080821015610e9a57600092505050610eeb565b60b8821080610eb6575060c08210158015610eb5575060f882105b5b15610ec657600192505050610eeb565b60c0821015610edf57600160b783030192505050610eeb565b600160f7830301925050505b919050565b600080825160001a90506080811015610f0c5760019150610f84565b60b8811015610f2357600160808203019150610f83565b60c0811015610f4d5760b78103806020036101000a60018501510480820160010193505050610f82565b60f8811015610f6457600160c08203019150610f81565b60f78103806020036101000a600185015104808201600101935050505b5b5b5b50919050565b60008160ff16600260ff160a60ff168360f81c60ff1681610fa757fe5b0460f81b905092915050565b6000610fbe82611012565b610fc757600080fd5b600080610fd384611043565b80925081935050506020811115610fe957600080fd5b6000811415610ffd5760009250505061100d565b806020036101000a825104925050505b919050565b60008082602001511415611029576000905061103e565b60008260000151905060c0815160001a109150505b919050565b60008061104f83611012565b61105857600080fd5b60008084600001519050805160001a91506080821015611086578093506001925083839350935050506110cb565b60b88210156110a457600185602001510392506001810193506110c2565b600060b7830390508060018760200151030393506001818301019450505b83839350935050505b915091565b604051806040016040528060008152602001600081525090565b604051806040016040528060008152602001600081525090565b60405180604001604052806111176110ea565b8152602001600081525090565b604051806040016040528060029060208202803883398082019150509050509056fea265627a7a7231582012bf9dd93e91503b89e725266d906d29b44870ac317db8aaacf14f03ce5c139f64736f6c634300050d0032";
const ABI = [{
    "constant":true,
    "inputs":[{
        "internalType":"bytes",
        "name":"_value",
        "type":"bytes"
    }, {
        "internalType":"bytes",
        "name":"_parentNodes",
        "type":"bytes"
    }, {
        "internalType":"bytes",
        "name":"_path",
        "type":"bytes"
    }, {
        "internalType":"bytes32",
        "name":"_root",
        "type":"bytes32"
    }],
    "name":"testVerify",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "payable":false,
    "stateMutability":"view",
    "type":"function"
}];

contract('Patricia Trie', (accounts) => {

    var patriciatrietest;

    before('Deploy Test contract', async () => {
        let contract = new web3.eth.Contract(ABI);
        let contractInstance = await contract.deploy({data: bytecode})
        .send({from: accounts[0], gas: "0xFFFFFFFFFFFF"})

        patriciatrietest = contractInstance;
    })

    describe('VerifyProof', async function () {
        it('should successfully verify all proofs', async function () {
            for( let i = 0; i < testData['success'].length; i++) {
                data = testData['success'][i];
                let result = await patriciatrietest.methods.testVerify(data.value, data.nodes, data.path, data.rootHash).call({from: accounts[0], gas: "0xFFFFFFFFFFFF"});
                assert.equal(result, true);
            }
        });

        it('should fail verifying all proofs with incompatible data', async function () {
            for( let i = 0; i < testData['fail'].length; i++) {
                data = testData['fail'][i];
                let result = await patriciatrietest.methods.testVerify(data.value, data.nodes, data.path, data.rootHash).call({from: accounts[0], gas: "0xFFFFFFFFFFFF"});
                assert.equal(result, false);
            }
        });

    });
});

const testData = {
    "success": [{
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x61",
        "value": "0x857465737431",
        "nodes": "0xf83bf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x826162",
        "value": "0x74",
        "nodes": "0xf87ff839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x83616263",
        "value": "0x857465737433",
        "nodes": "0xf87ff839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x8461626564",
        "value": "0x857465737435",
        "nodes": "0xf8cbf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080e583161626a06b1a1127b4c489762c8259381ff9ecf51b7ef0c2879b89e72c993edc944f1ccce5808080ca8220648685746573743480ca822064868574657374358080808080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x8461626364",
        "value": "0x857465737434",
        "nodes": "0xf8cbf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080e583161626a06b1a1127b4c489762c8259381ff9ecf51b7ef0c2879b89e72c993edc944f1ccce5808080ca8220648685746573743480ca822064868574657374358080808080808080808080"
    }],
    "fail": [{
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x61",
        "value": "0x857465737432",
        "nodes": "0xf83bf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x826163",
        "value": "0x75",
        "nodes": "0xf87ff839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x83616263",
        "value": "0x857465737434",
        "nodes": "0xf87ff839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x8461626564",
        "value": "0x857465737435",
        "nodes": "0xf8cbf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080e583161626a06b1a1127b4c489762c8259381ff9ecf51b7ef0c2879b89e72c993edc944f1ccce5808080ca8220648685746573743480ca822064868574657374358080808080808080808085"
    }, {
        "rootHash": "0xda2e968e25198a0a41e4dcdc6fcb03b9d49274b3d44cb35d921e4ebe3fb5c54c",
        "path": "0x8461626364",
        "value": "0x857465737435",
        "nodes": "0xf8cbf839808080808080c8318685746573743180a0207947cf85c03bd3d9f9ff5119267616318dcef0e12de2f8ca02ff2cdc720a978080808080808080f8428080c58320616274cc842061626386857465737433a05d495bd9e35ab0dab60dec18b21acc860829508e7df1064fce1f0b8fa4c0e8b2808080808080808080808080e583161626a06b1a1127b4c489762c8259381ff9ecf51b7ef0c2879b89e72c993edc944f1ccce5808080ca8220648685746573743480ca822064868574657374358080808080808080808080"
    }]
}