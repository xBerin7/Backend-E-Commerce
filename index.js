const server = require('./src/server.js')
const db = require('./src/db/index.db.js')
require('dotenv').config()

const { PORT } = process.env

db()

server.listen(PORT, () => {
  console.log(`***SERVER RUNNING ON : ${PORT}*****`)
})
