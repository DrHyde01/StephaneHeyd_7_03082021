const { Sequelize } = require("sequelize");
require("dotenv").config(); // Afin d'utiliser les variables d'environnement pour la connexion

// Paramètres de connexion à la BDD MySql via Sequelize ----------------------------------------------------------------
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
