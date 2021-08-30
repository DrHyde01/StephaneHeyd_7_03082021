// Création du modèle User qui servira à alimenter la table Users dans notre BDD --------------------------------------
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstName: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    lastName: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Utilisation d'un regex pour le format d'adresse mail
      },
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },

    description: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },

    picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};
