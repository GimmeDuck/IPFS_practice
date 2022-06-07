const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('71084a474f5f077b9699', '5d9f0655f5b4194f2e0bfac0eff6fe0005a242c8af72bed24cf78cb61619d7da');

/* test Authentication 
pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
*/

var i = 1;  //gimme_duck index
var result_ = '';
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./first_duck.png');

const options = {
    pinataMetadata: {
        name: "GIMMEDUCK_TEST"+i,
        keyvalues: {
            customKey: 'gimmeduck_test'+i,
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    console.log("File Uploaded!");
    console.log(result);
    result_ = result.IpfsHash;

    /*pin JSON to IPFS*/
    const body = {
        "name":"Gimme_duck"+i,
        "description":"Gimme_duck upload practice!",
        "image":"ipfs://"+result_,
        "attributes":[{"trait_type": "Unknown","value": "Unknown"}]
    };

    const options2 = {
        pinataMetadata: {
            name: "GIMMEDUCK_TEST_JSON"+i,
            keyvalues: {
                customKey: 'gimmeduck_test_json',
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    pinata.pinJSONToIPFS(body, options2).then((result2) => {
        console.log("JSON Uploaded!");
        console.log(result2);
    }).catch((err2) => {
        console.log(err2);
    });
    
}).catch((err) => {
    console.log(err);
});
