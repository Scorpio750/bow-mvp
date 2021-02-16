const db = require('./db')
const {User, Post } = require('./models')

// register models
require('./models')


Post.belongsTo(User);
// Media.belongsTo(User);

module.exports = {
  db,
  User,
  Post
}
