const mongoose = require('mongoose')

require('dotenv').config()

const { DB_URI } = process.env

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
            },
            (err) => {
                if(err) {
                    console.error(`DB: ERROR`)
                } else {
                    console.log(`***Conexión correcta!!***`)
                }
            }
        )
    }
    connect()
}
