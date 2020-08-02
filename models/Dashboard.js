const mongoose = require('mongoose')

const { Schema, model } = mongoose

const DashboardSchema = new Schema(
  {
    scores: { type: Number, required: true },
    pseudoDone: [{ type: Boolean, required: true }],
    sbsDone: [{ type: Boolean, required: true }],
    jsgamesDone: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

const Dashboard = model('Dashboard', DashboardSchema)

module.exports = Dashboard
