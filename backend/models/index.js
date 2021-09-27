// Initialisation de Sequelize à partir du fichier de configuration
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, { // Nouvelle instance Sequelize
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Déclaration des modèles qui seront utilisés pour les diverses opérations CRUD ------------------------------
db.User = require("../models/User.js")(sequelize, Sequelize);
db.Post = require("../models/Post.js")(sequelize, Sequelize);
db.Comment = require("../models/Comment.js")(sequelize, Sequelize);
db.Like = require("../models/Like.js")(sequelize, Sequelize);

// Mise en place des associations entre tables ---------------------------------------------------------------
db.User.hasMany(db.Post, {
  onDelete: "CASCADE", // Nécessaire de renseigner onDelete également dans les associations hasMany !
});
db.User.hasMany(db.Comment, {
  onDelete: "CASCADE",
});
db.User.hasMany(db.Like, {
  onDelete: "CASCADE",
});

db.Post.hasMany(db.Comment, {
  onDelete: "CASCADE",
});
db.Post.hasMany(db.Like, {
  onDelete: "CASCADE",
});

db.Post.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Like.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Comment.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Like.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

module.exports = db;
