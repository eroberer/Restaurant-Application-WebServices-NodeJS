const config = require('./config/connection');
const connection = config.connection;
let md5 = require('md5');

async function login (username, password) {
    let {login} = await getAccount(username, password);
    return login;
}

function getAccount(username, password) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, md5(password)], (error, accounts, fields) => {
            if (error) return reject(error)
            let login = false;
            if(accounts.length > 0) login = true;
            resolve({ login, fields });
        })
    })
}

module.exports = {
    login : login
}