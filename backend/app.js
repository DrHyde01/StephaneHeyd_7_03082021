const express = require('express');

const app = express(); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à notre api peut importe l'origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajout de headers aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Acceptation des requêtes renseignées
    next();
    });

// Test requête
app.use((req, res, next) => {
    res.json({ message: 'COUCOU' });
    next();
  });

module.exports = app;