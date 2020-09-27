const express = require('express')
const { awardMedal, getUsersMedals } = require('../database/medalsDb')
const router = express.Router()

router.get('/:userId/:accountId/show', (req, res) => {
  const { userId } = Number(req.params)
  const { accountId } = Number(req.params)
  return awardMedal(userId, accountId)
    .then(() => {
      return getUsersMedals(userId)
    })
    .then((medals) => {
      res.status(200)
      res.json({ medals })
      return null
    })
    .catch((err) => {
      sendErr(err, res)
    })
})

function sendErr (err, res) {
  res.status(500).send('Database Error ' + err.msg)
}

module.exports = router
