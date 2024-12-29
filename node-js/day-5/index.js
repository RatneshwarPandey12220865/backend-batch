const crypto = require('crypto');


const randomValues = crypto.randomBytes(8);

console.log(randomValues.toString('hex'));


const hashvalue = crypto.createHash("sha256").update("password").digest("hex");
// How to convert the hash value to a string
console.log(hashvalue.toString('hex'));
console.log(hashvalue)




// crypto modules - Node-js

//* 1. crypto.randomBytes(size, [callback])
// Purpose: To generate cryptographically strong pseudo-random data.
// Usage: Useful for creating random tokens, password salts, etc.

// Real-life examples

    // 1. token generation for password reset
    // 2. api key generation
    // 3. password salt generation
    // 4. random string generation

//* 2.  crypot.createHash(algorithm)


