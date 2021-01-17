const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const passwordHandler = async (firstname, email, oldpassword, newpassword, res, req) => {
   try {
      const query = `update credentials set password=? 
                where email=? and password =? and firstname=?`

      const [rows] = await connection
         .promise()
         .query(query, [newpassword, email, oldpassword, firstname])
      if (rows.affectedRows === 0)
         return res.render('updatePassword', {
            message: 'Incorrect Credentials!!',
         })
      else
         return res.render('updatePassword', {
            message: 'Password Updated Successfully!!',
            firstname: req.session.name,
         })
   } catch (error) {
      res.render('updatePassword', {
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
         firstname: req.session.name,
      })
   }
}

router.get('/updatePassword', (req, res) => {
   if (req.session.name === undefined && req.session.email === undefined) {
      return res.redirect('/login')
   }
   res.render('updatePassword', {
      firstname: req.session.name,
   })
})
router.post('/updatePassword', (req, res) => {
   let { firstname, email, oldpassword, newpassword } = req.body
   firstname = firstname.toLowerCase()
   email = email.toLowerCase()
   if (!(firstname === req.session.name)) {
      return res.render('updatePassword', {
         message: 'Enter Your Name Not Others!!',
      })
   }
   passwordHandler(firstname, email, oldpassword, newpassword, res, req)
})
module.exports = router
