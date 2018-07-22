const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const Joi = require('joi')


exports.successResponse = successResponse;
exports.randomAlphaNumeric = randomAlphaNumeric;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.failActionFunction = failActionFunction;
exports.authorizationHeaderObj = authorizationHeaderObj();

function authorizationHeaderObj() {
    return Joi.object({
        authorization: Joi.string().required().description('Bearer Token'),
    }).unknown();
}

function successResponse(data) {
    return {
        statusCode: 200,
        data: data || {},
        message: "Success"
    }
}

function randomAlphaNumeric(length) {
    if (!Number.isFinite(length)) {
        throw new TypeError('Expected a finite number');
    }
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

async function hashPassword(password) {
    const saltRounds = Config.constants.bcryptSaltRounds
    const passwordHash = bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log("hash is ",hash)
        return hash;
    });
    return passwordHash
}

async function comparePassword(hashPassword, plainPassword) {
    const verifyPassword = bcrypt.compare(plainPassword, hashPassword).then(function (res) {
        if (res == true) {
            return true;
        }else{
            throw Boom.unauthorized(Constant.errorMessages.invalidCreds)
        }
    });
    return verifyPassword;
}

async function generateToken(data, expireTime) {
    const signedData = jwt.sign({ data: data }, Config.constants.jwtKey, { expiresIn: expireTime });
    return signedData;
}

async function verifyToken(accessToken) {
    try {
        const decoded = jwt.verify(accessToken, Config.constants.jwtKey);
        if (decoded) {
            return decoded;
        }
        throw Boom.unauthorized("Invalid access token")
    } catch (err) {
        throw Boom.unauthorized("Invalid access token")
    }
}

function failActionFunction(error) {
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf('[') > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    delete error.output.payload.validation;
    return error;
};

