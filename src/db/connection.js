const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abhinav",
    port: "3306",
    database: "expensemanager"
})

connection.connect((error) => {
    if (error) {
        return console.log("Not Connected To database" + error)
    }
    console.log("Connected to database successfully!!")
})
module.exports = connection