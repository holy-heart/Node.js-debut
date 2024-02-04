const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.put('/api/pokemons/:id',auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        Pokemon.findByPk(id)//return
          .then(pokemon => {
            if(pokemon===null){
              const message = `the pokémon ${req.params.id} doesn't exist.`
              return res.status(404).json({message, data: pokemon })
            }
            const message = `Le pokémon ${req.params.id} a bien été modifié.`
            res.json({message, data: pokemon })
          })
          .catch(error => {                                                      //remove
            const message = `the pokémon ${req.params.id} couldn't be found.`    //remove
            res.status(500).json({message, data: error})                         //remove
          })                                                                     //remove
      })
      .catch(error => {
        if (error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message: error.message, data: error})
        }
        const message = `the pokémon ${req.params.id} couldn't be updated, retry later please.`
        res.status(500).json({message, data: error})
      })
  })
}