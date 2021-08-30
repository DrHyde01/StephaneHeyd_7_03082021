const express = require("express");
const db = require("./models"); // Utilisation des modèles pour la BDD
const path = require("path");

// Import des routes ----------------------------------------------------------------------------------------
const usersRoutes = require("./routes/users.js");
const postsRoutes = require("./routes/posts.js");

// Mise en place de l'app ---------------------------------------------------------------------------------------
const app = express();

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

// Test de connexion à la BDD ----------------------------------------------------------------
const dataBaseTest = async function () {
  try {
    await db.sequelize.authenticate();
    console.log("Connected to the database !");
  } catch (error) {
    console.error("Unable to connect to the database, too bad !", error);
  }
};
dataBaseTest();

// Mise à jour de la BDD --------------------------------------------------------------------------------
db.sequelize
  .sync({ force: false})
  .then(() => console.log("Database is updating !"))
  .catch((error) => console.log("Oops, something wrong here !", error));

// Utilisation des fonctionnalités ou packages -----------------------------------------------------------
app.use(express.json()); // Remplace bodyParser sur les dernières versions de Express
app.use(express.urlencoded({ extended: true })); // En complément de express.json
app.use('/images', express.static(path.join(__dirname, 'images'))); // Pour que Express gère le dossier images de manière statique à chaque requête 


// Déclaration des routes --------------------------------------------------------------------------------
app.use("/api/users/", usersRoutes);
app.use("/api/posts/", postsRoutes);


module.exports = app;
