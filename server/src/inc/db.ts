const mysql = require('mysql2');

/**
 * Starting a connection pool for quick mysql access and reduce connections calls to MySql Database
 */
let connPool = mysql.createPool({
    host: 'database',
    user: 'root',
    password: 'hipages',
    database: 'hipages',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * An simple base MySql Query exection function
 * @param queryString A MySql query string
 * @param queryParams An array to params for the prepared query statement
 * @returns Promise of the executed MySql Statement
 */
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