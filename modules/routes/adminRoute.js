
const Joi = require('joi');
const controller = require('../controllers');
const Lib = require('../libs/commFunctions')
const user = [
    {
        method: 'POST',
        path: '/admin/login',
        config: {
            handler: async function (request, h) {
                return controller.adminController.login(request.payload)
            },
            description: 'Admin Login',
            notes: 'Admin Login api',
            tags: ['api', 'Admin'],
            auth: false,
            validate: {
                payload: {
                    email: Joi.string().email().required().description(" Email of the user"),
                    password: Joi.string().required().description('Admin password')
                },
            }
        },
    },
    {
        method: 'POST',
        path: '/admin/access_token_login',
        config: {
            handler: async function (request, h) {
                let accessTokenData = request.auth.artifacts;
                let accessToken = request.auth.credentials.token
                return controller.adminController.accessTokenLogin(accessToken, accessTokenData);
            },
            description: 'Admin Login via access token',
            notes: 'Admin Login api',
            tags: ['api', 'Admin'],
            auth:{
                strategy: 'skelton'
            },
            validate: {
                headers: Lib.authorizationHeaderObj
            }
        },
    }
]


module.exports = user