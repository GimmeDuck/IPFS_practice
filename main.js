const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('71084a474f5f077b9699', '5d9f0655f5b4194f2e0bfac0eff6fe0005a242c8af72bed24cf78cb61619d7da');

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});

const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./egg.png');
const options = {
    pinataMetadata: {
        name: "GIMMEDUCK_TEST",
        keyvalues: {
            customKey: 'gimmeduck_test',
            customKey2: 'gimmeduck_test2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});