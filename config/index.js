const env = process.env.NODE_ENV
let config = ''
switch(env){
    case "dev" :
        config = require('./development')
        break;
    default:
        config = require('./default')
        break;
  }

module.exports = config;