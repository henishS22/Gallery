const bcrypt = require('bcryptjs');

exports.comparePassword = (password,encryptedPass) => {
    return bcrypt.compare(password,encryptedPass);
}