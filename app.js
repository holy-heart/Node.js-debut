const express = require('express')
const favicon = require('serve-favicon')
const bodyParser =require('body-parser');
const Sequelize= require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 3000;

//j'ai utiliser une chaine de middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    
Sequelize.initDb() // Opération non bloquante. Le code continue à s'exécuter même si l'initialisation de la base de données n'est pas encore terminée.   

app.get('/',(req,res)=>{
    res.json('Tu ne pouras plus courir les minettes...')
})

require('./src/routes/createPokemon')(app)
require('./src/routes/findByPkPokemons')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/login')(app)

app.use(({res})=>{
    const message ="data not found, try another url"
    res.status(404).json({message})
})
// Démarrage du serveur Express et écoute des requêtes entrantes sur le port 3000
app.listen(port, () => console.log(`l'application node est sur : http://localhost:${port}`));