require('dotenv').config()
const mongoose = require('mongoose')

const { DB_URI_DEV } = process.env

const dbUri = DB_URI_DEV

const JsGameLogic = require('../models/JsGameLogic')

const jsGameLogic = [
  {
    title: 'exercise one',
    solution: 'c',
    image:
      'https://res.cloudinary.com/dfxmz0ida/image/upload/v1595070217/samples/execiseOneJsGame_prphue.png',
  },
  {
    title: 'exercise two',
    solution: 'b',
    image:
      'https://res.cloudinary.com/dfxmz0ida/image/upload/v1595093977/samples/Codiant/exerciseTwoJsGame_dmtgkg.png',
  },
  {
    title: 'exercise three',
    solution: 'd',
    image:
      'https://res.cloudinary.com/dfxmz0ida/image/upload/v1595492543/samples/Codiant/exerciseThreeGame_nm0ohy.png',
  },
  {
    title: 'end exercises',
    solution: 'NO',
    image:
      'https://res.cloudinary.com/dfxmz0ida/image/upload/v1595322416/samples/Codiant/Captura_de_pantalla_de_2020-07-21_11-05-24_smsmsy.png',
  },
]

const JsGameLogicInstances = jsGameLogic.map((elem) => new JsGameLogic(elem))

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to database')

    const gameLogic = await JsGameLogic.find()
    console.log('Seed JsGameLogic in db: ', gameLogic)

    // IF they exist, delete the seed.
    if (gameLogic.length) {
      await JsGameLogic.collection.drop()
      console.log('Drop the db')
    }

    await JsGameLogic.insertMany(JsGameLogicInstances)
    console.log('Insert JsGameLogic in db')
  })

  .catch((error) => {
    console.error(error.message)
    console.error('Conection error')
  })
  .finally(() => {
    mongoose.disconnect()
  })
