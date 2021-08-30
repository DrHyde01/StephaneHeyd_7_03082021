// Initialisation de Sequelize à partir du fichier de configuration
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
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

// Necessaire à la création ou la MAJ de nos tables ------------------------------
db.User = require("../models/User.js")(sequelize, Sequelize);
db.Post = require("../models/Post.js")(sequelize, Sequelize);
db.Comment = require("../models/Comment.js")(sequelize, Sequelize);
db.Like = require("../models/Like.js")(sequelize, Sequelize);

// Mise en place des associations entre tables ----------------------------------
db.User.hasMany(db.Post);
db.User.hasMany(db.Comment);
db.User.hasMany(db.Like);

db.Post.hasMany(db.Comment);
db.Post.hasMany(db.Like);

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
