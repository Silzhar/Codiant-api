const mongoose = require('mongoose')

const { Schema, model } = mongoose

const CardSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, minlength: 10 },
  },
  {
    timestamps: true,
  }
)
const Card = model('Card', CardSchema)

module.exports = Card
