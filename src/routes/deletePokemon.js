const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon===null){
          const message = `the pokémon ${req.params.id} doesn't exist.`
          return res.status(404).json({message})
        }
        Pokemon.destroy({
          where: { id: pokemon.id }
        })
          .then(_ => {
            const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
            res.json({message, data: pokemon })
          })
          .catch(error => {
            const message = `the pokémon ${req.params.id} couldn't be deletted, retry later please.`
            res.status(500).json({message, data: error})
          })
      })
      .catch(error => {
        const message = `the pokémon ${req.params.id} couldn't be found, retry later please.`
        res.status(500).json({message, data: error})
      })
  })
}