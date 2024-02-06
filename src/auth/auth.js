module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader){
    res.status(401).json({ message :  `Vous n'avez pas le droit d'acces.`})
  }
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = require('jsonwebtoken').verify(token, require('../auth/private_key'), (error, decodedToken) => {
  if(error){
    res.status(401).json({ message: `L'utilisateur n'est pas autorisé à accèder à cette ressource.`, data: error })
  }
  const userId = decodedToken.userId
  if (req.body.userId && req.body.userId !== userId) {
    const message = `L'identifiant de l'utilisateur est invalide.`
    res.status(401).json({ message })
  } else {
    next()
  }
  })
}