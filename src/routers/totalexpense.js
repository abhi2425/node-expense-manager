const express = require('express')
const connection = require('../db/connection')
const router = express.Router()

router.get('/totalexpense', async (req, res) => {
   try {
      if (req.session.name === undefined && req.session.email === undefined) {
         return res.redirect('/login')
      }
      const query = `Select _id,name, sum(itemprice) as sum from expense
                  group by name order by itemprice desc`
      const [rows] = await connection.promise().query(query)
      if (rows.length === 0)
         return res.render('welcome', {
            error_message: 'No Data Found !!',
            firstname: req.session.name,
         })
      else return res.send(rows)
   } catch (error) {
      return res.render('welcome', {
         firstname: 'Something is Wrong!!.Either Internet disconnected or database not responding',
      })
   }
})

module.exports = router
