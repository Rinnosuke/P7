const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const forumRoutes = require('./routes/forum');
const path = require('path');

//On initialise notre appli avec Express
const app = express();

//On se connect à notre base de donnée MongoDb
mongoose.connect('mongodb://localhost:27017/mydb',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//On autorise les requêtes entre nos serveurs backEnd et FrontEnd
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//On récupère le json du body de la requète pour pouvoir le lire si nécessaire
app.use(express.json());
//On donne l'adresse du dossier images à notre application
app.use('/images', express.static(path.join(__dirname, 'images')));
//Et enfin nous traitons les requêtes en fonction de la route utilisé
app.use('/api/auth', userRoutes);
app.use('/api/forum', forumRoutes);

module.exports = app;