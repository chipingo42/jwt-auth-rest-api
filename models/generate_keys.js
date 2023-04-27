// i don't have to install this package on npm because it is bulid inside NODEJS
const crypto = require('crypto')


// so using this crypto modules i can generate a key
const key1 = crypto.randomBytes(32).toString("hex") // this come as buffer method we need to change to string by saying toString to hex
const key2 = crypto.randomBytes(32).toString("hex") // this come as buffer method we need to change to string by saying toString to hex
console.table({key1, key2});