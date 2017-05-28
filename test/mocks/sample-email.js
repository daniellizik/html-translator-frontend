import { readFileSync } from 'fs'

module.exports = readFileSync(`${__dirname}/../htmlFixtures/sample-email.html`, 'utf8')