require('dotenv').config()
const mongoose = require('mongoose')

const { DB_URI_DEV } = process.env

const dbUri = DB_URI_DEV

const Pseudocode = require('../models/Pseudocode')

const pseudocode = [
  {
    reference: '001',
    title: 'Selection Sort',
    subtitle: 'Suppose A is an array of N values. We want to sort A in ascending order.',
    description:
      'That is, A[0] should be the smallest and A[N-1] should be the largest. The idea of Selection Sort is that we repeatedly find the smallest element in the unsorted part of the array and swap it with the first element in the unsorted part of the array.',
    puzzle: [
      '\xa0\xa0\xa0Smallsub = i',
      'For i = 0 to n-1 do:',
      '\xa0\xa0\xa0For j = i + 1 to N-1 do:',
      '\xa0\xa0\xa0\xa0\xa0If A(j) < A(Smallsub)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Smallsub = j',
      '\xa0\xa0\xa0\xa0\xa0End-If',
      '\xa0\xa0\xa0End-For',
      '\xa0\xa0\xa0Temp = A(i)',
      '\xa0\xa0\xa0A(i) = A(Smallsub)',
      '\xa0\xa0\xa0A(Smallsub) = Temp',
      'End-For',
    ],
    solution: [
      'For i = 0 to n-1 do:',
      '\xa0\xa0\xa0Smallsub = i',
      '\xa0\xa0\xa0For j = i + 1 to N-1 do:',
      '\xa0\xa0\xa0\xa0\xa0If A(j) < A(Smallsub)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Smallsub = j',
      '\xa0\xa0\xa0\xa0\xa0End-If',
      '\xa0\xa0\xa0End-For',
      '\xa0\xa0\xa0Temp = A(i)',
      '\xa0\xa0\xa0A(i) = A(Smallsub)',
      '\xa0\xa0\xa0A(Smallsub) = Temp',
      'End-For',
    ],
  },

  {
    reference: '002',
    title: 'Insertion Sort',
    subtitle: 'Suppose A is an array of N values. We want to sort A in ascending order.',
    description:
      'Insertion Sort is an algorithm to do this as follows: We traverse the array and insert each element into the sorted part of the list where it belongs. This usually involves pushing down the larger elements in the sorted part.',
    puzzle: [
      '\xa0\xa0\xa0J = I',
      'For I = 1 to N-1',
      '\xa0\xa0\xa0Do while (J > 0) and (A(J) < A(J - 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Temp = A(J)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J) = A(J - 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J - 1) = Temp',
      '\xa0\xa0\xa0\xa0\xa0\xa0J = J - 1',
      '\xa0\xa0\xa0End-Do',
      'End-For',
    ],
    solution: [
      'For I = 1 to N-1',
      '\xa0\xa0\xa0J = I',
      '\xa0\xa0\xa0Do while (J > 0) and (A(J) < A(J - 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Temp = A(J)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J) = A(J - 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J - 1) = Temp',
      '\xa0\xa0\xa0\xa0\xa0\xa0J = J - 1',
      '\xa0\xa0\xa0End-Do',
      'End-For',
    ],
  },

  {
    reference: '003',
    title: 'Bubble Sort',
    subtitle: 'Suppose A is an array of N values. We want to sort A in ascending order.',
    description:
      "Bubble Sort is a simple-minded algorithm based on the idea that we look at the list, and wherever we find two consecutive elements out of order, we swap them. We do this as follows: We repeatedly traverse the unsorted part of the array, comparing consecutive elements, and we interchange them when they are out of order. The name of the algorithm refers to the fact that the largest element 'sinks' to the bottom and the smaller elements 'float' to the top.",
    puzzle: [
      '\xa0\xa0\xa0For J = 0 to N - 2',
      'For I = 0 to N - 2',
      '\xa0\xa0\xa0If (A(J) > A(J + 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Temp = A(J)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J) = A(J + 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J + 1) = Temp',
      '\xa0\xa0\xa0End-If',
      '\xa0\xa0\xa0End-For',
      'End-For',
    ],
    solution: [
      'For I = 0 to N - 2',
      '\xa0\xa0\xa0For J = 0 to N - 2',
      '\xa0\xa0\xa0If (A(J) > A(J + 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0Temp = A(J)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J) = A(J + 1)',
      '\xa0\xa0\xa0\xa0\xa0\xa0A(J + 1) = Temp',
      '\xa0\xa0\xa0End-If',
      '\xa0\xa0\xa0End-For',
      'End-For',
    ],
  },
]

const pseudoInstances = pseudocode.map((elem) => new Pseudocode(elem))

mongoose
  .connect(dbUri, {
    // So you don't launch warnings when connecting to BD.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to database')

    const pseudo = await Pseudocode.find()
    console.log('Pseudo in db: ', pseudo)

    // IF they exist, delete the users.
    if (pseudo.length) {
      await Pseudocode.collection.drop()
      console.log('Drop the db')
    }

    await Pseudocode.insertMany(pseudoInstances)
    console.log('Insert pseudo in DB')
  })

  .catch((error) => {
    console.error(error.message)
    console.error('Conection error')
  })
  .finally(() => {
    mongoose.disconnect()
  })
