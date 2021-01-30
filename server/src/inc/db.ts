const mysql = require('mysql2');

let connPool = mysql.createPool({
    host: 'database',
    user: 'root',
    password: 'hipages',
    database: 'hipages',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const executeMySqlQuery = async (queryString: string, queryParams: Array<any> = []) => {
    return new Promise((resolve, reject) => {
        connPool.execute(queryString, queryParams, (err, results, fields) => {
            if (err) {
                //TODO: trigger and report error logging system
                reject({
                    error: true,
                    data: err
                });
            }
            resolve({
                success: true,
                data: results,
                //fields: fields //No Need to send for now
            });
        });
    });
}