const express = require('express')
const Sbs = require('../models/Sbs')

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const sbs = await Sbs.find()
    return res.status(200).json({ data: sbs })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
