const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.status(200).json({ message, data: pokemons })
      })
      .catch(error =>{
        const message="the pokemon list couldn't be carged, sorry and retry later."
        res.status(500).json({message, data: error})
      })
  })
}