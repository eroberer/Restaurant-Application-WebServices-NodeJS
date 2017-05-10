const database = require('./config/connection');
let md5 = require('md5');

async function login(username, password) {
    let login = await database.query({
        sql : 'SELECT * FROM users WHERE username = ? AND password = ?',
        values : [
            username,
            md5(password)
        ]
    });
    return login.result.length > 0 ;
}

module.exports = {
    login : login
};