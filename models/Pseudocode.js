const mongoose = require('mongoose')

const { Schema, model } = mongoose
const PseudocodeSchema = new Schema(
  {
    reference: { type: String, required: true },
    title: { type: String, required: true, minlength: 10 },
    subtitle: { type: String, required: true, minlength: 10 },
    description: { type: String, required: true, minlength: 10 },
    // image: { type: String },
    puzzle: [{ type: String }],
    solution: [{ type: String }],
    // card: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
  }
)
const Pseudocode = model('Pseudocode', PseudocodeSchema)

module.exports = Pseudocode
