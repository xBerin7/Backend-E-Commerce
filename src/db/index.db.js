const mongoose = require('mongoose')

require('dotenv').config()

const { DB_URI } = process.env

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      DB_URI,
      {
        useNewUrlParser: true, useUnifiedTopology: true 
      },
      (err) => {
        if (err) {
          console.error('DB: ERROR', err)
        } else {
          console.log('***Conexión correcta!!***')
        }
      }
    )
  }
  connect()
}
