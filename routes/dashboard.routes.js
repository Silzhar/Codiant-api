const express = require('express')
// const { authControl } = require('../middlewares/auth.middleware')

const Dashboard = require('../models/Dashboard')
const User = require('../models/Users')

const router = express.Router()

router.get('/mydashboard/:id', async (req, res) => {
  try {
    const myUser = await User.findById(req.params.id)
    const appo = await Dashboard.findById(myUser.dashboard)
    return res.status(200).json({ data: appo })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Validate - PseudocodePUT
// { "index": 1, "value": "10"}
router.put('/pseudovalidate/:id', async (req, res) => {
  try {
    const myUser = await User.findById(req.params.id)
    const appo = await Dashboard.findById(myUser.dashboard)
    const mypseudo = appo.pseudoDone
    mypseudo[req.body.index] = true
    const myDashboard = await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $set: { pseudoDone: mypseudo } },
      { new: true }
    )

    await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $inc: { scores: req.body.value } },
      { new: false }
    )

    return res.status(200).json({ data: myDashboard })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// { "index": 1, "value": "10"}
router.put('/sbsvalidate/:id', async (req, res) => {
  try {
    const myUser = await User.findById(req.params.id)
    const appo = await Dashboard.findById(myUser.dashboard)
    const mysbs = appo.sbsDone
    mysbs[req.body.index] = true
    const myDashboard = await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $set: { sbsDone: mysbs } },
      { new: true }
    )

    await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $inc: { scores: req.body.value } },
      { new: false }
    )

    return res.status(200).json({ data: myDashboard })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.put('/jsgamesvalidate/:id', async (req, res) => {
  try {
    const myUser = await User.findById(req.params.id)
    // const appo = await Dashboard.findById(myUser.dashboard)
    // const mysbs = appo.jsgamesDone
    // mysbs[req.body.index] = true
    const myDashboard = await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $set: { jsgamesDone: true } },
      { new: true }
    )

    await Dashboard.findByIdAndUpdate(
      myUser.dashboard,
      { $inc: { scores: req.body.value } },
      { new: false }
    )

    return res.status(200).json({ data: myDashboard })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = router
