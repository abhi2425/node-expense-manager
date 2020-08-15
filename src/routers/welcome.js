const express = require("express")
const router = express.Router()
module.exports = router

router.get("/welcome", (req, res) => {
    if (req.session.name === undefined && req.session.email === undefined) {
        return res.redirect('/login')
    }
    res.render("welcome", {
        firstname: req.session.name
    })


})