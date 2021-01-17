const mysql = require('mysql2')
require('dotenv').config()
const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const connection = mysql.createConnection({
   host: host,
   user: user,
   password: password,
   port: '3306',
   database: database,
})

connection.connect((error) => {
   if (error) {
      return console.log('Not Connected To database' + error)
   }
   console.log('Connected to database successfully!!')
})
module.exports = connection
