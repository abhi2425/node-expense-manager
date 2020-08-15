const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get("/login", (req, res) => {
    res.render("login")
})
router.post("/login", (req, res) => {
    let {
        firstname,
        email,
        password
    } = req.body
    firstname = firstname.toLowerCase()
    email = email.toLowerCase()
    req.session.name = firstname
    req.session.email = email
    const sql = `select firstname,email,password from credentials
                   where firstname=? and email=? and password=?`
    connection.query(sql, [firstname, email, password], (error, result) => {
        if (result[0] === undefined) {
            return res.render("login", {
                message: "Invalid Credentials"
            })
        }
        res.redirect('/welcome')
        if (error) {
            return res.redirect("/login")
        }
    })
})