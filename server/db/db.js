const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name

const db = new Sequelize(
  'bow', 'bow_admin', 'kinkyboots',
  {
    dialect: 'postgresql',
    logging: false,
  }
)
module.exports = db
