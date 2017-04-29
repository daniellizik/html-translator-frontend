import { readFileSync } from 'fs'

module.exports = readFileSync(`${__dirname}/../../www/sample-email.html`, 'utf8')