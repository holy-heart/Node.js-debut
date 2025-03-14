const { Pokemon } = require('../db/sequelize')
const { Op }= require('sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', require('../auth/auth'), (req, res) => {
    if(req.query.name){
      if(req.query.name.length===1){
        res.status(400).json({message: 'You have to enter at least 2 character on the search bar'})
      }
      Pokemon.findAndCountAll({
        order : ['name'],
        where: {name: {[Op.like]: `%${req.query.name}%`}},//      `${name}%`     `%${name}`
        limit: parseInt(req.query.limit) || 5
      })
      .then(({count, rows})=>{
        res.status(200).json({message: `there is ${count} pokemons corespend to the search ${req.query.name}`, data : rows})
      })
      .catch(error =>{
        res.status(500).json({message :`the pokemon list with ${req.query.name} couldn't be carged, sorry and retry later.`, data: error})
      })
    }
    Pokemon.findAndCountAll({
      order : ['name'], 
      limit : parseInt(req.query.limit) || 5
    })
    .then(({count, rows})=> {
      res.status(200).json({ message: `La liste des pokémons a bien été récupérée, there is ${count} pokemons`, data: rows })
    })
    .catch(error =>{
      res.status(500).json({message: "the pokemon list couldn't be carged, sorry and retry later.", data: error})
    })
  })
}