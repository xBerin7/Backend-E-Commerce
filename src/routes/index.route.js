const { Router } = require('express')
const fs = require('fs')
const indexRoute = Router()

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(__dirname).forEach((file) => {
    const files = removeExtension(file)
    const SKIP = ['index'].includes(files)
    if(!SKIP) {
        indexRoute.use(`/${file}`, require(`/${file}`))
    }
})

module.exports = indexRoute

