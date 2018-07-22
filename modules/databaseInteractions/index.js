const Q = require('q');

module.exports.executeTransactionQuery = function(conn, sql, params) {
    return Q.Promise(function (resolve, reject) {
        const query = conn.query(sql, params, (err, result) => {
            console.log("SQL Transaction query execution -->> ", query.sql, err, result);
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        });
    })
}


module.exports.executeSQLQuery = function(sql, params) {
    return Q.Promise(function (resolve, reject) {
        const query = connection.query(sql, params, (err, result) => {
            console.log("SQL query execution -->> ", query.sql, err, result && result.length);
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        });
    })
}
