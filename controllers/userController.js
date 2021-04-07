const jwt = require('jsonwebtoken');
const { handleError, handleResponse } = require('../utils/requestHandlers');
const { findUserByEmail, createUser, updateUserByEmail, removeUserDp, findById, updateUserById } = require('../db-services/user-services');
const userJoi = require('../middlewares/userValidation');

exports.register = async (req, res, next) => {
    try {
        
        if (req.file) {
            req.body.dp = req.file.filename;
        }
        const value = await userJoi.validateAsync(req.body);
        const userExists = await findUserByEmail(value.email);
        if (!userExists) {
            const user = await createUser(value);
            delete user._doc.password;
            handleResponse({ res, data: user });
        } else {
            handleResponse({ res, msg: 'fail' ,data: 'This email is already registered' });
        }
    } catch (e) {
        handleError({ res, data:e });
    }
}

exports.login = async (req, res, next) => {
    try {
        const value = await userJoi.validateAsync(req.body);
        const findUser = await findUserByEmail(value.email);
        if (!findUser) {
            handleResponse({ res, data: 'This email is not registered, please register First' });
        } else {
            const match = await findUser.correctPassword(value.password, findUser.password);
            if (match == false) {
                handleResponse({ res, data: 'Incorrect Password, Try Again !' });
            } else {
                const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
                const user = await updateUserByEmail(value.email, { userToken: token, tokenExpiresIn: Date.now() });
                req.session.name = user._id;
                handleResponse({ res, statusCode: 201, msg:'Logged In' ,data: user });
            }
        }
    } catch (e) {
        handleError({ res, data:e });
    }
}

exports.info = async (req, res, next) => {
    try {
        const user = await findById(req.user._id);
        handleResponse({ res, data: user });
    } catch (e) {
        handleError({ res, e });
    }
}

exports.updateMe = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.dp = req.file.filename;
        }
        const updated = await updateUserById(req.user._id, req.body);
        handleResponse({ res, data: updated });
    } catch (e) {
        handleError({ res, data:e });
    }
}

exports.removeDp = async (req, res, next) => {
    const user = await removeUserDp(req.user._id);
    handleResponse({ res, data: user });
}
