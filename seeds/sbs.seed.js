require('dotenv').config()
const mongoose = require('mongoose')

const { DB_URI_DEV } = process.env

const dbUri = DB_URI_DEV

const Sbs = require('../models/Sbs')

const sbs = [
  {
    reference: '001',
    title: 'Inline Element or not?',
    subtitle: 'True or false?',
    description:
      'An inline element does not start on a new line and it only takes up as much width as necessary. Swipe Left if an element is inline, otherwise SWIPE RIGHT',
    puzzle: [
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/main_hzzuyq.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/form_cat6hh.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/p_kkjvw8.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/nav_jxuuaa.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/div_ttcxi2.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/h3_pfwqh1.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/span_lmgwka.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/table_b3w8em.png',
    ],
    solution: [false, false, false, false, false, false, true, false],
  },

  {
    reference: '002',
    title: 'Inline Element or not? p2',
    subtitle: 'True or false?',
    description:
      'An inline element does not start on a new line and it only takes up as much width as necessary. Swipe Left if an element is inline, otherwise SWIPE RIGHT',
    puzzle: [
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/main_hzzuyq.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/form_cat6hh.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/p_kkjvw8.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/nav_jxuuaa.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/div_ttcxi2.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/h3_pfwqh1.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/span_lmgwka.png',
      'https://res.cloudinary.com/uyscuty/image/upload/v1595160208/table_b3w8em.png',
    ],
    solution: [false, false, false, false, false, false, true, false],
  },
]

const sbsInstances = sbs.map((elem) => new Sbs(elem))

mongoose
  .connect(dbUri, {
    // So you don't launch warnings when connecting to BD.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to database')

    const aux = await Sbs.find()
    console.log('Sbs in db: ', aux)

    // IF they exist, delete the users.
    if (aux.length) {
      await Sbs.collection.drop()
      console.log('Drop the db')
    }

    await Sbs.insertMany(sbsInstances)
    console.log('Insert pseudo in DB')
  })

  .catch((error) => {
    console.error(error.message)
    console.error('Conection error')
  })
  .finally(() => {
    mongoose.disconnect()
  })
