const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "y2w3wxldca8enczv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "byve5yl1bzx4fp4w",
    password: "rfqpppmu1evzuroe",
    port: "3306",
    database: "h3dphxbp01mmlnve"
})

connection.connect((error) => {
    if (error) {
        return console.log("Not Connected To database" + error)
    }
    console.log("Connected to database successfully!!")
})
module.exports = connection