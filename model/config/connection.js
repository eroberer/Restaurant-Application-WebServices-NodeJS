const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 25,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'restoran'
});

function getImageHost(dir = "") {
    return `http://fatihsimsek.me/restoran/Public/Uploads/${dir}`;
}

function query({ sql = '', values = [] }) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, values, (err2, result) => {
                if (err2) return reject(err2);
                resolve({result});
                connection.release();
            });
        });
    });
}

module.exports = {
    getImageHost : getImageHost,
    query : query
}; 