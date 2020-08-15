const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get('/totalexpense', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    const sql = `Select _id,name, sum(itemprice)as sum from expense
                  group by name order by itemprice desc`
    connection.query(sql, (error, result) => {
        if (!result[0]) {
            return res.render("welcome", {
                message: "No Data Found !!"
            })
        }
        res.send(result)
        if (error) {
            return res.redirect("/welcome")
        }
    })
})