const Users = require('../models/user');

exports.findUserByEmail = (data) => {
    return Users.findOne({ email: data });
}

exports.findById = async (id) => {
    return Users.findOne({ _id: id }).select('-password');
}

exports.createUser = (data) => {
    return Users.create(data);
}

exports.updateUserByEmail = async (email, data) => {
    return Users.findOneAndUpdate({ email:email }, data, {
        new: true
    });
}

exports.updateUserById = async (id, data) => {
    return Users.findOneAndUpdate({ _id: id }, data, {
        new: true
    });
}

exports.removeUserDp = (id, image) => {
    return Users.findByIdAndUpdate(id, { $unset: { dp: '' } }, {
        new: true
    });
}