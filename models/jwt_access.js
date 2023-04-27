const jwt = require('jsonwebtoken')
const createError = require('http-errors')


module.exports = {
  // signing access token means we are generating new a New token that is a signed token, so we are creating a token here
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "https://portfolio-chipingo42.vercel.app/",
        audience: userId
      }

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          // return reject(err)
          reject(createError.InternalServerError())
        }
        resolve(token) 
      })
    })
  }
}