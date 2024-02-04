const { Pokemon } = require('../db/sequelize')
const { Op }= require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if(req.query.name){
      if(req.query.name.length===1){
        res.status(400).json({message: 'You have to enter at least 2 character on the search bar'})
      }
      return Pokemon.findAndCountAll({
        order : ['name'],
        where: {name: {[Op.like]: `%${req.query.name}%`}},//      `${name}%`     `%${name}`
        limit: parseInt(req.query.limit) || 5
      })
        .then(({count, rows})=>{
          const message =`there is ${count} pokemons corespend to the search ${req.query.name}`
          res.json({message, data : rows})
        })
    }
    Pokemon.findAndCountAll({
      order : ['name'], 
      limit : parseInt(req.query.limit) || 5
    })
      .then(({count, rows})=> {
        const message = `La liste des pokémons a bien été récupérée, there is ${count} pokemons`
        res.status(200).json({ message, data: rows })
      })
      .catch(error =>{
        const message="the pokemon list couldn't be carged, sorry and retry later."
        res.status(500).json({message, data: error})
      })
  })
}