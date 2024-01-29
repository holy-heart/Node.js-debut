const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')

const app = express();
const port = 3000;
const {success}= require('./helper.js')
let pokemons = require('./mock-pokemon.js')

//j'ai utiliser une chaine de middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

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
app.get('/api/pokemons', (req,res)=>{
    const num= pokemons.length
    res.send(`i have ${num} pokemons on my pokedex`)
})
//la liste de tous les pokemon
app.get('/api/pokemons/all', (req,res)=>{
    const message2 = 'the full pokemon list with all their informations'
    res.json(success(message2,pokemons))
})
// Démarrage du serveur Express et écoute des requêtes entrantes sur le port 3000
app.listen(port, () => console.log(`l'application node est sur : http://localhost:${port}`));