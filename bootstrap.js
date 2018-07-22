const MYSQL = require('mysql');

var db_config = {
    host: process.env.MYSQL_HOST || Config.databaseSettings.MYSQL_HOST,
    user: process.env.MYSQL_USER || Config.databaseSettings.MYSQL_USER,
    password: process.env.MYSQL_PASS || Config.databaseSettings.MYSQL_PASS,
    database: process.env.MYSQL_DBNAME || Config.databaseSettings.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT || Config.databaseSettings.MYSQL_PORT,
    multipleStatements: true
};
function initializeConnectionPool(db_config){
    var numConnectionsInPool = 0;
    console.log('CALLING INITIALIZE POOL');
    
    var conn = MYSQL.createPool(db_config);
    conn.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log('NUMBER OF CONNECTION IN POOL : ', numConnectionsInPool);
    });
    return conn;
}


global.connection = initializeConnectionPool(db_config);
