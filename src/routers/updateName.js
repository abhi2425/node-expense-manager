const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get('/updateName', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("updateName", {
        firstname: req.session.name
    })
})

router.post('/updateName', (req, res) => {
    let {
        oldfirstname,
        newfirstname,
        newlastname,
        password
    } = req.body

    oldfirstname = oldfirstname.toLowerCase()
    newfirstname = newfirstname.toLowerCase()
    newlastname = newlastname.toLowerCase()

    if (!(oldfirstname === req.session.name)) {
        return res.render("updateName", {
            message: "Enter Your Name Not Others!!"
        })
    }

    const sql1 = `update credentials set firstname=?,lastname=? 
                      where firstname=? and password=?`
    connection.query(sql1, [newfirstname, newlastname, oldfirstname, password], (error, result) => {
        if (!result.affectedRows) {
            return res.render("updateName", {
                message: "Incorrect Password!!"
            })
        }
        const sql2 = `update expense set name=? 
                      where _id=(select _id from credentials where password=?)`

        connection.query(sql2, [newfirstname, password], (error, result) => {
            if (result.changedRows) {
                return res.render('updateName', {
                    message: "Name Updated Successfully!!"
                })
            }
            if (error) {
                return res.redirect("/updateName")
            }
        })
    })
})