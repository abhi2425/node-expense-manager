const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const insertDataHandler = async (firstname, itemname, itemprice, res, req) => {
   try {
      const date = new Date().toDateString()
      const query =
         'Insert into expense value (?,?,?,?,(Select _id from credentials where firstname =?))'
      const [rows] = await connection
         .promise()
         .query(query, [firstname, itemname, itemprice, date, firstname])

      if (rows.length === 0)
         return res.render('insert', {
            message: 'Failed To Insert!!',
            firstname: req.session.name,
         })
      else
         res.render('insert', {
            message: 'Inserted Successfully!!',
            firstname: req.session.name,
         })
   } catch (error) {
      return res.render('insert', {
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
         firstname: req.session.name,
      })
   }
}

router.get('/insert', (req, res) => {
   if (req.session.name === undefined && req.session.email === undefined) {
      return res.redirect('/login')
   }
   res.render('insert', {
      firstname: req.session.name,
   })
})
router.post('/insert', (req, res) => {
   let { firstname, itemname, itemprice } = req.body
   firstname = firstname.toLowerCase()
   itemname = itemname.toLowerCase()
   if (!(firstname === req.session.name)) {
      return res.render('insert', {
         message: 'Enter Your Name Not Others!!',
         firstname: req.session.name,
      })
   }
   insertDataHandler(firstname, itemname, itemprice, res, req)
})
module.exports = router
