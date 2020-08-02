const express = require('express')
const Pseudocode = require('../models/Pseudocode')

const router = express.Router()

// GET PSEUDOCODE BY REFERENCE
router.get('/by-reference/:reference', async (req, res) => {
  try {
    //   const pseudoByReference = await Pseudocode.find({ reference : req.params.reference })
    const pseudoByReference = await Pseudocode.findOne({ reference: req.params.reference })
    return res.status(200).json({ data: pseudoByReference })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/all', async (req, res) => {
  try {
    const pseudo = await Pseudocode.find()
    return res.status(200).json({ data: pseudo })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
