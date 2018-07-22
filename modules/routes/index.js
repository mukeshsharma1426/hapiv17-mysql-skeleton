const admin = require('./adminRoute');

/**
 * Concat other route files 
 * e.g. admin.concat(user);
 */
const routes = admin.concat([])

module.exports = routes