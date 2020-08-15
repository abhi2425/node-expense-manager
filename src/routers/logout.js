const express = require("express")
const router = express.Router()
module.exports = router

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
})