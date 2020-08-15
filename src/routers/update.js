const express = require("express")
const connection = require("../db/connection")
const router = express.Router()
module.exports = router

router.get('/update', (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("update", {
        firstname: req.session.name
    })
})