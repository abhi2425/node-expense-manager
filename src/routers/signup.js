const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const signUpHandler = async (firstname, lastname, email, password, res) => {
   try {
      const _id = (Math.random() * 10 ** 7).toFixed()
      const emailCheck = 'Select email from credentials where email=?'
      const [rows] = await connection.promise().query(emailCheck, [email])
      if (rows.length !== 0)
         return res.render('signup', { message: 'Email Already registered!! Plz Login!!' })

      const addUser = 'Insert into credentials value(?,?,?,?,?)'
      await connection.promise().query(addUser, [firstname, lastname, email, password, _id])
      return res.redirect('/welcome')
   } catch (error) {
      return res.render('signup', {
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
      })
   }
}

router.get('/signup', (_, res) => {
   res.render('signup')
})
router.get('/', (_, res) => {
   res.render('signup')
})

router.post('/signup', (req, res) => {
   let { firstname, lastname, email, password, confirmpassword } = req.body
   firstname = firstname.toLowerCase()
   lastname = lastname.toLowerCase()
   email = email.toLowerCase()
   req.session.name = firstname
   req.session.email = email
   if (!(password === confirmpassword)) {
      return res.render('signup', {
         message: 'Password Not Matches!!',
      })
   }
   signUpHandler(firstname, lastname, email, password, res)
})

module.exports = router
