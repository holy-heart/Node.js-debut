const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')


module.exports = (app) => {
  app.post('/api/pokemons',require('../auth/auth'), (req, res) => {
    Pokemon.create(req.body)
    .then(pokemon => {
      res.json({ message: `Le pokémon ${req.body.name} a bien été crée.`, data: pokemon })
    })
    .catch(error=>{
      if(error instanceof ValidationError){
        return res.status(400).json({message : error.message, data: error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      res.status(500).json({message: "the pokemon couldn't added, sorry and retry later.", data: error})
    })
  })
}