const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get("/fetchuser", (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    const sql = `select _id,name,itemname,itemprice,dateofentry from expense 
            where name=? and _id=(select _id from credentials 
                                  where firstname=? and email=?)`
    connection.query(sql, [req.session.name, req.session.name, req.session.email], (error, result) => {

        if (!result[0]) {
            return res.render("welcome", {
                message: "No Data To Fetch!!"
            })
        }

        res.send(result)
        if (error) {
            return res.redirect("/welcome")
        }
    })
})