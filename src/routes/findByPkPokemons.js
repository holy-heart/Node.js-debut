const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon===null){
          const message =`the pokemon ${req.params.id} doesn't exist, retry another id.`
          res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.status(200).json({ message, data: pokemon })
      })
      .catch(error=>{
        const message =`the pokemon ${req.params.id} could'nt be carged, sorry and retry later.`
        res.status(500).json({message, data: error})
      })
  })
}