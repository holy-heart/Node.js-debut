const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', require('../auth/auth'), (req, res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon => {
      if(!pokemon){
        return res.status(404).json({message:`the pokémon ${req.params.id} doesn't exist.`})
      }
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        res.json({message: `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`, data: pokemon })
      })
      .catch(error => {
        res.status(500).json({message: `the pokémon ${req.params.id} couldn't be deletted, retry later please.`, data: error})
      })
    })
    .catch(error => {
      res.status(500).json({message: `the pokémon ${req.params.id} couldn't be found, retry later please.`, data: error})
    })
  })
}