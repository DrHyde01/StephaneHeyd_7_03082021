const express = require("express");
const sequelize = require("./config/db.config"); // On a besoin des informations de connexion à notre BDD

// Mise en place de l'app ---------------------------------------------------------------------------------------
const app = express();

// Importation des modèles permettant la création des tables -----------------------------------------
const User = require('./models/User');

// Middleware permettant d'éviter les erreurs CORS lors des communications back - front -----------------------------------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Ajout de headers aux requêtes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Acceptation des requêtes renseignées
  next();
});

// Test requête ----------------------------------------------------
app.use((req, res, next) => {
  res.json({ message: "COUCOU" });
  next();
});

// Test connexion BDD -----------------------------------------------
const dataBaseTest = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database !");
  } catch (error) {
    console.error("Unable to connect to the database :(", error);
  }
};
dataBaseTest();

app.use(express.json()); // Remplace bodyParser sur les dernières versions de Express
app.use(express.urlencoded({ extended: true })); // En complément de express.json

module.exports = app;
