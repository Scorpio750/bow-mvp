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
  image: Sequelize.BLOB,
  sequence: Sequelize.INT,
  // artistFK: Sequelize.INT,
  privacy: Sequelize.INT,
  //if majority says ok, pending bridget res
  canMarket: {
    type: Sequelize.BOOL,
    defaultValue: false
  },
  sfw: {
    type: Sequelize.BOOL,
    defaultValue: false
  },
  caption: Sequelize.STRING,
  price: Sequelize.FLOAT,
  year: Sequelize.DATE,
  medium: Sequelize.STRING,

  materials: Sequelize.STRING,
  dimensions: Sequelize.STRING,
  location: Sequelize.STRING,
  geo: Sequelize.STRING,
  genre: Sequelize.STRING,
  subset: Sequelize.STRING,
  language: Sequelize.STRING,
  credits: Sequelize.STRING,
  press: Sequelize.STRING,
  distributor: Sequelize.STRING,
  tags: Sequelize.ARRAY(Sequelize.STRING),
}

)


module.exports = Post
