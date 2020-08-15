const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get('/insert', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("insert", {
        firstname: req.session.name
    })
})
router.post('/insert', (req, res) => {

    let {
        firstname,
        itemname,
        itemprice
    } = req.body
    firstname = firstname.toLowerCase()
    itemname = itemname.toLowerCase()

    if (!(firstname === req.session.name)) {
        return res.render("insert", {
            message: "Enter Your Name Not Others!!"
        })
    }
    const date = new Date().toDateString()
    const sql = "Insert into expense value (?,?,?,?,(Select _id from credentials where firstname =?))"


    connection.query(sql, [firstname, itemname, itemprice, date, firstname], (error, result) => {
        if (!result) {
            return res.render("insert", {
                message: "Failed To Insert!!"
            })
        }
        res.render('insert', {
            message: "Item Inserted Successfully!!"
        })
        if (error) {
            res.redirect("/insert")
        }
    })

})