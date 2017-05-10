const mysql = require('mysql');

function getImageHost(dir = "") {
    return `http://fatihsimsek.me/restoran/Public/Uploads/${dir}`;
}

function getConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'restoran'
    });
}

function query({ sql = '', values = [] }) {
    return new Promise((resolve, reject) => {
        getConnection().query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve({ result });
        });
    });
}

module.exports = {
    getImageHost : getImageHost,
    query : query
}; 