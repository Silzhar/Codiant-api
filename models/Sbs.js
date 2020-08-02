const mongoose = require('mongoose')

const { Schema, model } = mongoose
const SbsSchema = new Schema(
  {
    reference: { type: String, required: true },
    title: { type: String, required: true, minlength: 10 },
    subtitle: { type: String, required: true, minlength: 10 },
    description: { type: String, required: true, minlength: 10 },
    // image: { type: String },
    puzzle: [{ type: String }],
    solution: [{ type: Boolean }],
  },
  {
    timestamps: true,
  }
)

const Sbs = model('Sbs', SbsSchema)
module.exports = Sbs
