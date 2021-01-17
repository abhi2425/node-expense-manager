const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const nameHandler = async (newfirstname, newlastname, oldfirstname, password, res, req) => {
   try {
      const query_1 = `update credentials set firstname=?,  lastname=? 
                       where firstname=? and password=?`
      const [rows] = await connection
         .promise()
         .query(query_1, [newfirstname, newlastname, oldfirstname, password])
      if (rows.affectedRows === 0)
         return res.render('updateName', {
            message: 'Wrong Credentials',
            firstname: req.session.name,
         })
      else {
         const query_2 = `update expense set name=? 
                      where _id=(select _id from credentials where password=?)`

         await connection.promise().query(query_2, [newfirstname, password])
         return res.render('updateName', {
            message: 'Name Updated Successfully!!',
            firstname: req.session.name,
         })
      }
   } catch (error) {
      return res.render('updateName', {
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
         firstname: req.session.name,
      })
   }
}
router.get('/updateName', (req, res) => {
   if (req.session.name === undefined && req.session.email === undefined) {
      return res.redirect('/login')
   }
   res.render('updateName', {
      firstname: req.session.name,
   })
})

router.post('/updateName', (req, res) => {
   let { oldfirstname, newfirstname, newlastname, password } = req.body

   oldfirstname = oldfirstname.toLowerCase()
   newfirstname = newfirstname.toLowerCase()
   newlastname = newlastname.toLowerCase()

   if (!(oldfirstname === req.session.name)) {
      return res.render('updateName', {
         message: 'Enter Your Name Not Others!!',
      })
   }
   nameHandler(newfirstname, newlastname, oldfirstname, password, res, req)
})
module.exports = router
