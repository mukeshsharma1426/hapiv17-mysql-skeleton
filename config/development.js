const Libs = require('../modules/libs/commFunctions');
const config = {
    serverSetupConfig: {
        port: 3000,
        routes: {
            cors: {
                origin: ['*']
            },
            validate: {
                failAction: async (request, h, err) => {
                    const error = Libs.failActionFunction(err)
                    throw error;
                }
            }
        }
    },
    version: "/v1",
    databaseSettings: {
        MYSQL_HOST: "127.0.0.1",
        MYSQL_USER: "root",
        MYSQL_PASS: "root",
        MYSQL_DBNAME: "skelton",
        MYSQL_PORT: 8889
    },
    swaggerSetupConfig: {
        info: {
            title: "SBC Backend",
            version: "0.0.1",
            contact: {
                name: "Mukesh Sharma",
                email: "mukeshsharma1426@gmail.com"
            }
        },
        grouping: "tags",
        documentationPage: true,
        jsonEditor: true,
        tags: [
            {
                "name": "Admin",
                "description": "Admin API's"
            }
        ]
    },
    constants: {
        passwordLength: 8,
        bcryptSaltRounds: 10,
        jwtKey: "@E#223D$FdafEW$342sa22sds",
        deviceType: {
            ANDROID: "Android",
            IOS: "Ios"
        }
    }
}

module.exports = config