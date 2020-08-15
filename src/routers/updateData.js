const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router


router.get('/updateData', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("updateData", {
        firstname: req.session.name
    })
})

router.post("/updateData", (req, res) => {
    let {
        firstname,
        olditemname,
        newitemname,
        newprice,
        password
    } = req.body
    firstname = firstname.toLowerCase()
    olditemname = olditemname.toLowerCase()
    newitemname = newitemname.toLowerCase()

    if (!(firstname === req.session.name)) {
        return res.render("updateData", {
            message: "Enter Your Name Not Others!!"
        })
    }

    const sql = `select itemname from expense where itemname=? and _id=(select _id from 
                  credentials where firstname=?)`
    connection.query(sql, [olditemname, firstname], (error, result) => {
        if (!result) {
            return res.render("updateData", {
                message: "Item Not Found!!"
            })
        }
        const sql2 = `update expense set itemname=?,  itemprice=?
                               where itemname =? and (select _id from credentials where password=?)`
        connection.query(sql2, [newitemname, newprice, olditemname, password], (error, result) => {
            if (!result.affectedRows) {
                return res.render('updateData', {
                    message: "Incorrect Password!!"
                })
            }
            res.render('updateData', {
                message: "Item Updated Successfully!!"
            })

            if (error) return res.redirect('/updateData')
        })
    })
})