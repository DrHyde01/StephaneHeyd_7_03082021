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
db.user = require("../models/User.js")(sequelize, Sequelize);
db.post = require("../models/Post.js")(sequelize, Sequelize);
db.comment = require("../models/Comment.js")(sequelize, Sequelize);
db.like = require("../models/Like.js")(sequelize, Sequelize);

// Mise en place des associations entre tables ----------------------------------
db.user.hasMany(db.comment);
db.user.hasMany(db.post);
db.user.hasMany(db.like);

module.exports = db;
