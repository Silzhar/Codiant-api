const mongoose = require('mongoose')

const { Schema, model } = mongoose

const JsGameLogicSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 10 },
    solution: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

const JsGameLogic = model('JsGameLogic', JsGameLogicSchema)

module.exports = JsGameLogic
