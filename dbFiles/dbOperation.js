const config = require('./dbConfig'),
      sql = require('mssql');

const getUsers = async (username) => {
    try {
        let pool = await sql.connect(config);
        console.log(username);
        let users = await pool.request().query(`SELECT * from users where username = '${username}'`)
        console.log("users", users)
        return users
    } catch (e) {
        console.log(e);
    }
}

const createUser = async (User) => {
    try {
        let pool = await sql.connect(config);
        console.log("USER",User)
        let users = await pool.request().query(`insert into users (username, password) values('${User.Username}', '${User.Password}')`)
        return users
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUsers,
    createUser
}