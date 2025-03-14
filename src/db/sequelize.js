const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user.js')
const pokemons = require('./mock-pokemon')

let sequelize

if(process.env.NODE_ENV==='production'){
  sequelize = new Sequelize('Database', 'Username', 'password', { //depuis heroku
    host: 'localhost',//depuis heroku
    dialect: 'mysql',
    dialectOptions: {
      timezone: '+01:00',
    },
    logging: true//depuis heroku
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      timezone: '+01:00',
    },
    logging: false
  })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User= UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({ force: true })
  .then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })//.then(pokemon => console.log(pokemon.toJSON()))
    })
    require('bcrypt').hash('sacha1987', 10)
    .then(hash=>{
      User.create({
        username: 'sacha',
        password: hash
      })
    })//.then(user => console.log(user.toJSON()))
      
      console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon, User
}