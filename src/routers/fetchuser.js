const express = require('express')
const connection = require('../db/connection')
const router = express.Router()
module.exports = router

const fetchUserDataHandler = async (req, res) => {
   try {
      const query = `select _id,name,itemname,itemprice,dateofentry from expense 
            where name=? and _id=(select _id from credentials 
                                  where firstname=? and email=?)`
      const [rows] = await connection
         .promise()
         .query(query, [req.session.name, req.session.name, req.session.email])
      if (rows.length === 0)
         return res.render('welcome', {
            message: 'No Data To Fetch!!',
            firstname: req.session.name,
         })
      else return res.status(200).send(rows)
   } catch (error) {
      return res.render('welcome', {
         firstname: 'Something is Wrong!!.Either Internet disconnected or database not responding',
      })
   }
}

router.get('/fetchuser', (req, res) => {
   if (req.session.name === undefined && req.session.email === undefined) {
      return res.redirect('/login')
   }
   fetchUserDataHandler(req, res)
})
