const crypto = require('crypto');

const createHash = (data) => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data);
  return shasum.digest('hex');
};

module.exports.createHash = createHash;
