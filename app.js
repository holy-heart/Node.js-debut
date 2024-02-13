const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const app = require('express')()

//j'ai utiliser une chaine de middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    
require('./src/db/sequelize').initDb() // Opération non bloquante. Le code continue à s'exécuter même si l'initialisation de la base de données n'est pas encore terminée.   

app.get('/',(req,res)=>{
    return res.json('Tu ne pouras plus courir les minettes...')
})

require('./src/routes/createPokemon')(app)
require('./src/routes/findByPkPokemons')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/login')(app)
require('./src/routes/signIn')(app)

app.use(({res})=>{
    return res.status(404).json({message : "data not found, try another url"})
})
// Démarrage du serveur Express et écoute des requêtes entrantes sur le port 3000
app.listen(process.env.PORT || 3000, () => console.log(`l'application node est sur : http://localhost:${process.env.PORT || 3000}`));