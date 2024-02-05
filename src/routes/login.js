const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({where: {username: req.body.username}})
      .then(user => {
        if(!user){
          const message= "the username is doesn't exist"
          res.status(404).json({message})
        }
        bcrypt.compare(req.body.password, user.password)
          .then(isPasswordValid => {
            if(!isPasswordValid) {
              const message = `the password is wrong`;
              return res.status(401).json({ message, data: user })
            }
            // JWT
            const token = jwt.sign(
              {user: user.id},
              privateKey,
              {expiresIn: '24h'}
            )
            const message = `user is successfully logged in`;
            return res.status(200).json({message, data: user, token})
          })
      })
      .catch(error=> {
        message ="the user cannot be connected, retry later."
        res.status(500).json({message, data: error})
      })
  })
}