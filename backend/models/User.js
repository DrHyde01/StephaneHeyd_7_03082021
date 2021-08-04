const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

// Création du modèle User qui servira à alimenter la table Users dans notre BDD --------------------------------------
const User = sequelize.define('User', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING(40),
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING(40),
        allowNull: false
    },

    pseudo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ // Utilisation d'un regex pour le format d'adresse mail
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

});

// Création de la table Users via la fonction sync --------------------------------------------------------------
sequelize.sync({ force: true }) // Si la table existe déjà elle est recréee 
    .then(() => console.log("Table User created !"))
    .catch(error => console.log("Oops !", error));

module.exports = User;