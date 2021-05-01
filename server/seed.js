const {db} = require('./db')
const {
  User,
  Post,
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      // defaults to Patron users
      email: 'kade@email.com',
      username: 'dirtydork',
      password: '1234567',
    },
    {
      email: 'sascha@email.com',
      username: 'webboss',
      password: '0987654',
      userType: 'ARTIST'
    },
  ]
 const newUsers = await User.bulkCreate(users)
 console.log(
  `seeded ${newUsers.length} users`
)

console.log(`seeded successfully`)

}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runSeed()

module.exports = seed;
