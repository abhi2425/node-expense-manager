const express = require('express')
const path = require("path")
const hbs = require("hbs")
const bodyParser = require('body-parser')
const session = require('express-session');
require("./db/connection")
const signup = require("./routers/signup")
const login = require("./routers/login")
const logout = require("./routers/logout")
const welcome = require("./routers/welcome")
const insert = require("./routers/insert")
const update = require("./routers/update")
const updateData = require("./routers/updateData")
const updatePassword = require("./routers/updatePassword")
const updateName = require("./routers/updateName")
const fetchuser = require("./routers/fetchuser")
const totalexpense = require("./routers/totalexpense")
const error = require("./routers/error")

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.json({
    limit: "1mb"
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: "secret-key", //Should be stored in environment variable
    resave: false,
    saveUninitialized: false //can be anything!!
}))
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialPath)
app.use(signup)
app.use(login)
app.use(logout)
app.use(welcome)
app.use(insert)
app.use(update)
app.use(updateData)
app.use(updateName)
app.use(updatePassword)
app.use(fetchuser)
app.use(totalexpense)
app.use(error)


app.listen(port, () => {
    console.log("Server Up at ", port)
})