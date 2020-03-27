const crypto = require('crypto');

module.exports = function genareteUniqueId(){

    return crypto.randomBytes(4).toString('HEX');
}