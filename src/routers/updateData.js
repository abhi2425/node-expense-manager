const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

const updateDataHandler = async (
   olditemname,
   firstname,
   itemname,
   newprice,
   password,
   res,
   req,
) => {
   try {
      const query_1 = `select itemname from expense where itemname=? and _id=(select _id from 
                  credentials where firstname=?)`
      const [rows] = await connection.promise().query(query_1, [olditemname, firstname])
      if (rows.affectedRows === 0)
         return res.render('updateData', {
            message: 'Item Not Found!!',
            firstname: req.session.name,
         })
      else {
         const query_2 = `update expense set itemname=?,  itemprice=?
                               where itemname =? and (select _id from credentials where password=?)`
         const rows = await connection
            .promise()
            .query(query_2, [itemname, newprice, olditemname, password])
         if (rows[0].affectedRows === 0)
            return res.render('updateData', {
               message: 'Incorrect Credentials!!',
               firstname: req.session.name,
            })
         else
            return res.render('updateData', {
               message: 'Item Updated Successfully!!',
               firstname: req.session.name,
            })
      }
   } catch (error) {
      return res.render('updateData', {
         firstname: req.session.name,
         message: 'Something is Wrong!!.Either Internet disconnected or database not responding',
      })
   }
}
router.get('/updateData', (req, res) => {
   if (req.session.name === undefined && req.session.email === undefined) {
      return res.redirect('/login')
   }
   res.render('updateData', {
      firstname: req.session.name,
   })
})

router.post('/updateData', (req, res) => {
   let { firstname, olditemname, newitemname: itemname, newprice, password } = req.body
   firstname = firstname.toLowerCase()
   olditemname = olditemname.toLowerCase()
   itemname = itemname.toLowerCase()

   if (!(firstname === req.session.name)) {
      return res.render('updateData', {
         message: 'Enter Your Name Not Others!!',
      })
   }
   updateDataHandler(olditemname, firstname, itemname, newprice, password, res, req)
})
module.exports = router
