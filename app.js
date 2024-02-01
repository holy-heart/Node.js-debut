const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser =require('body-parser')

const app = express();
const port = 3000;

//j'ai utiliser une chaine de middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
require('./src/routes/createPokemon')(app)
require('./src/routes/findByPkPokemons')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/updatePokemon')(app)
// Démarrage du serveur Express et écoute des requêtes entrantes sur le port 3000
app.listen(port, () => console.log(`l'application node est sur : http://localhost:${port}`));