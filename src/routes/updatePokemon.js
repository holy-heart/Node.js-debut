const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')

  
module.exports = (app) => {
  app.put('/api/pokemons/:id',require('../auth/auth'), (req, res) => {
    Pokemon.update(req.body, {
      where: { id: req.params.id}
    })
    .then(_ => {
      Pokemon.findByPk(req.params.id)//return
      .then(pokemon => {
        if(pokemon===null){
          return res.status(404).json({message: `the pokémon ${req.params.id} doesn't exist.`, data: pokemon })
        }
        res.json({message: `Le pokémon ${req.params.id} a bien été modifié.`, data: pokemon })
      })
      .catch(error => {                                                                                               //remove
        res.status(500).json({message: `Le pokémon ${req.params.id} a bien été modifié.`, data: error})               //remove
      })                                                                                                              //remove
    })
    .catch(error => {
      if (error instanceof ValidationError){
        return res.status(400).json({message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      res.status(500).json({message: `the pokémon ${req.params.id} couldn't be updated, retry later please.`, data: error})
    })
  })
}