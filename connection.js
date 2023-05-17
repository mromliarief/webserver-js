const mySql = require('mysql')

const db = mySql.createConnection({
    host:'127.0.0.1',
    password:'',
    user:'root',
    database:'db_karyawan'
})

module.exports = db