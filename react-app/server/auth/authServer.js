import { JsonWebTokenError } from "jsonwebtoken";

const jwt = require('jsonwebtoken');

function generateaccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s'})
}
