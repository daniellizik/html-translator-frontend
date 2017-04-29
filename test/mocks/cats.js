import { readFileSync } from 'fs'

module.exports = readFileSync(`${__dirname}/../htmlFixtures/cats.html`, 'utf8')