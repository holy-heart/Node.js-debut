const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser =require('body-parser')
const {success,getUniqueId}= require('./helper.js')
let pokemons = require('./mock-pokemon.js')
const app = express();
const port = 3000;

//j'ai utiliser une chaine de middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

//tester mon api rest
app.get('/', (req, res) => res.send("i am totally insane"));
//afficher l'id et le nom du pokemon 
app.get('/api/pokemon/:id',(req,res)=> {
    const id=parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon=> pokemon.id === id)
    const message = 'un pokemon a bien ete trouver'
    res.json(success(message,pokemon))
})
//afficher le nbr de pokemon
app.get('/api/pokemons/nbr', (req,res)=>{
    const num= pokemons.length
    res.send(`i have ${num} pokemons on my pokedex`)
})
//Lsit of all pokemons
app.get('/api/pokemons/all', (req,res)=>{
    const message2 = 'the full pokemon list with all their informations'
    res.json(success(message2,pokemons))
})
//adding an new pokemon
app.post('/api/pokemons/all', (req, res)=>{
    const id =getUniqueId(pokemons)
    const new_pokemon={...{id:id},...req.body, ...{created: new Date()}}
    pokemons.push(new_pokemon)
    const message3= `i added the new pokemon called ${new_pokemon.name}`
    res.json(success(message3,pokemons))
})
//update a pokemon with his id
app.put('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const pokemonName=pokemons.find(pokemon=>pokemon.id===id)
    const pokemonUpdated ={...{id:id},...req.body,...{created: pokemonName.created}}
    pokemons=pokemons.map(pokemon=>{
        return pokemon.id === id? pokemonUpdated : pokemon
    })
    const message=`the pokemon ${pokemonName.name} have been updated`
    res.json(success(message,pokemonUpdated))
})
app.delete('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const pokemondel=pokemons.find(pokemon=>pokemon.id===id)
    pokemons= pokemons.filter(pokemon=>pokemon.id !==id)
    const message=`the pokemon ${pokemondel.name} have been deleted`
    res.json(success(message,pokemondel))
})
// Démarrage du serveur Express et écoute des requêtes entrantes sur le port 3000
app.listen(port, () => console.log(`l'application node est sur : http://localhost:${port}`));