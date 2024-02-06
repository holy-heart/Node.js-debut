const { User } = require('../db/sequelize')
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    User.findOne({where: {username: req.body.username}})
    .then(user => {
      if(!user){
        res.status(404).json({message: "the username is doesn't exist"})
      }
      require('bcrypt').compare(req.body.password, user.password)
      .then(Valid => {
        if(!Valid) {
          return res.status(401).json({ message: `the password is wrong`, data: user })
        }
        // JWT
        const token = require('jsonwebtoken').sign(
          {user: user.id},
          require('../auth/private_key'),
          {expiresIn: '24h'}
        )
        res.json({message: `user is successfully logged in`, data: user, token})
      })
      .catch(error=>{
        res.status(500).json({message: "our server cannot verify your password, retry later", data: error})
      })
    })
    .catch(error=> {
      res.status(500).json({message: "the user cannot be connected, retry later.", data: error})})
  })
}