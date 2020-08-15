const express = require("express")
const connection = require("../db/connection")
const router = express.Router()

module.exports = router

router.get("/signup", (req, res) => {
    res.render("signup")
})
router.get("/", (req, res) => {
    res.render("signup")
})

router.post("/signup", (req, res) => {

    let {
        firstname,
        lastname,
        email,
        password,
        confirmpassword
    } = req.body
    firstname = firstname.toLowerCase()
    lastname = lastname.toLowerCase()
    email = email.toLowerCase()

    req.session.name = firstname
    req.session.email = email

    if (!(password === confirmpassword)) {
        return res.render("signup", {
            message: "Password Not Matches!!"
        })
    }
    const _id = (Math.random() * 10 ** 7).toFixed()
    const sql = "Insert into credentials value(?,?,?,?,?)"
    connection.query(sql, [firstname, lastname, email, password, _id], (error, result) => {

        if (!result) {
            return res.render('signup', {
                message: "Failed To SignUp!!"
            })
        }
        res.redirect("/welcome")
        if (error) {
            return res.redirect('/signup')
        }
    })
})