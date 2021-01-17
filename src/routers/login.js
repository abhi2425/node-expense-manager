const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const loginHandler = async (firstname, email, password, res) => {
   try {
      const query = `select firstname,email,password from credentials
                   where firstname=? and email=? and password=?`
      const [rows] = await connection.promise().query(query, [firstname, email, password])
      if (rows.length !== 0) return res.redirect('/welcome')
      else
         res.render('login', {
            message: 'Invalid Credentials',
         })
   } catch (error) {
      return res.render('login', {
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
      })
   }
}

router.get('/login', (_, res) => {
   res.render('login')
})
router.post('/login', (req, res) => {
   let { firstname, email, password } = req.body
   firstname = firstname.toLowerCase()
   email = email.toLowerCase()
   req.session.name = firstname
   req.session.email = email
   loginHandler(firstname, email, password, res)
})

module.exports = router
