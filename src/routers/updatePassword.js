const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get('/updatePassword', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("updatePassword", {
        firstname: req.session.name
    })
})
router.post("/updatePassword", (req, res) => {
    let {
        firstname,
        email,
        oldpassword,
        newpassword
    } = req.body
    firstname = firstname.toLowerCase()
    email = email.toLowerCase()
    if (!(firstname === req.session.name)) {
        return res.render("updatePassword", {
            message: "Enter Your Name Not Others!!"
        })
    }
    const sql = `update credentials set password=? 
                where email=? and password =? and firstname=?`

    connection.query(sql, [newpassword, email, oldpassword, firstname], (error, result) => {
        if (!result.affectedRows) {
            return res.render("updatePassword", {
                message: "Incorrect Credentials!!"
            })
        }
        res.render("updatePassword", {
            message: "Password Updated Successfully!!"
        })
        if (error) {
            return res.redirect("/updatePassword")
        }
    })
})