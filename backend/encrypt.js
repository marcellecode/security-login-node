module.exports = {
  encryptData: function encryptData(pass, key) {
    const crypto = require("crypto");

    const message = String(pass);
    const sha256Hasher = crypto.createHmac("sha256", String(key));
    const hash = sha256Hasher.update(message).digest("hex");

    return hash;
  },
};
