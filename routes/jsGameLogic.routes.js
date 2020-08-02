const express = require('express')
const JsGameLogic = require('../models/JsGameLogic')

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const gameLogic = await JsGameLogic.find()
    return res.status(200).json({ data: gameLogic })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
