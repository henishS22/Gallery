exports.handleResponse = ({
    res, statusCode , msg = 'Success', data = {}, result = 1,
}) => {
    if (!statusCode) {
        statusCode = 200;
    }
    res.status(statusCode).send({ result, msg, data });
};
  
exports.handleError = ({
    
    res, statusCode = 500, err = 'error', result = 0, data = {},
}) => {
    res.status(statusCode).send({
        result,
        msg: err.msg || err,
        data,
    });
};