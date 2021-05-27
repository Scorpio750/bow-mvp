const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  publicName: {
    type: Sequelize.STRING,
  },
  pronouns: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  userType: {
    type: Sequelize.ENUM(['PATRON', 'ARTIST', 'ADMIN', 'OWNER']),
    allowNull: false,
    defaultValue: 'PATRON'
  },
  instagram: Sequelize.STRING,
  twitter: Sequelize.STRING,
  microBio: Sequelize.TEXT,
  identityTags: Sequelize.STRING,
  city: Sequelize.STRING,
  region: Sequelize.STRING,
  country: Sequelize.STRING,
  marketingConsent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  liability: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  communityAgreements: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  artistheadshot: Sequelize.STRING,
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.hashPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.privacyLevel = function() {
  switch(this.userType) {
    case 'PATRON':
      return 2
    case 'ARTIST':
      return 3
    default:
      return 1
  }
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.hashPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.hashPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

module.exports = User
