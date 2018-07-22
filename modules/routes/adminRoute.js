
const Joi = require('joi');
const controller = require('../controllers')
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
            validate: {
                payload: {
                    email: Joi.string().email().required().description(" Email of the user"),
                    password: Joi.string().required().description('Admin password')
                },
            }
        },
    }
]


module.exports = user