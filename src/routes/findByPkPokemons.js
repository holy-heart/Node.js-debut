const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', require('../auth/auth'), (req, res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon => {
      if(!pokemon){
        res.status(404).json({message:`the pokemon ${req.params.id} doesn't exist, retry another id.`})
      }
      res.status(200).json({ message:'Un pokémon a bien été trouvé.', data: pokemon })
    })
    .catch(error=>{
      res.status(500).json({message: `the pokemon ${req.params.id} could'nt be carged, sorry and retry later.`, data: error})
    })
  })
}