const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
  title: {
    type:  Sequelize.STRING,
    allowNull: null,
    validate: {
      notEmpty: true,
    }
  },
  media: Sequelize.BLOB,
  sequence: Sequelize.INTEGER,
  // artistFK: Sequelize.INTEGER,
  privacy: {
    type: Sequelize.INTEGER,
    defaultValue: 4
  },
  //if majority says ok, pending bridget res
  canMarket: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  sfw: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  caption: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  bowAgreements: Sequelize.BOOLEAN,
  benefiting: Sequelize.STRING,
  year: Sequelize.STRING,
  medium: Sequelize.STRING,
  materials: Sequelize.STRING,
  dimensions: Sequelize.STRING,
  location: Sequelize.STRING,
  geo: Sequelize.STRING,
  genre: Sequelize.STRING,
  subset: Sequelize.STRING,
  references: Sequelize.STRING,
  languages: Sequelize.STRING,
  credits: Sequelize.STRING,
  pressLink: Sequelize.STRING,
  distributor: Sequelize.STRING,
  tags: Sequelize.ARRAY(Sequelize.STRING),
}

)


module.exports = Post
