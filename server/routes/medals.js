const express = require('express')
const { awardMedals } = require('../database/medalsDb')
const router = express.Router()

// router.get('/:id/medals', (req, res) => {
//   const userId = Number(req.params.id)
//   return awardMedals(userId)
//     .then((medal) => {
//       res.status(200)
//       res.json(medal)
//       return null
//     }).catch((err) => {
//       sendErr(err, res)
//     })
// })

function sendErr (err, res) {
  res.status(500).send('Database Error ' + err.msg)
}

module.exports = router
