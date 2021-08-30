const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Op = db.Sequelize.Op;

// Gestion de la création d'un utilisateur et cryptage du mot de passe  ---------------------------------------------------------------
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        admin: false,
      })

        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))

        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

// Gestion de la connexion d'un utilisateur existant -----------------------------------------------------------------------------
exports.login = (req, res, next) => {
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur inexistant !" }); // Si non un message d'erreur est retourné
    }
    bcrypt
      .compare(req.body.password, user.password) // On compare les hash de mot de passe transmis avec celui en mémoire
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          // Si OK un token est renvoyé au frontend avec un user id
          userId: user.id,
          token: jwt.sign(
            // Sign permet d'encoder un nouveau token
            { userId: user.id },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          ),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// Récupération des informations d'un user ------------------------------------------------------------------------
exports.getUser = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => res.status(200).json({ user }))

    .catch((error) => res.status(500).json({ error }));
};

// Récupération de tout les users -----------------------------------------------------------------------------
exports.getAllUsers = (req, res, next) => {
  db.User.findAll({
    attributes: [
      // Le tableau correspond aux informations demandées
      "id",
      "firstName",
      "lastName",
      "username",
      "email",
      "description",
      "picture",
    ],
  })
    .then((users) => res.status(200).json({ users }))

    .catch((error) => res.status(500).json({ error }));
};

// Mise à jour d'un user -------------------------------------------------------------------------------------
exports.updateUser = (req, res, next) => {
  const userObject = req.file // On vérifie si req.file est existant
    ? {
        ...JSON.parse(req.body.user), // Si oui on traîte la nouvelle image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.body.filename
        }`,
      }
    : { ...req.body }; // Si non on traîte uniquement le nouvel objet
  db.User.findOne({
    // On recherche l'user en fonction de son id
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user) {
        db.User.update(userObject, {
          // Puis on le met à jour en fonction des infos renseignées
          where: { id: req.params.id },
        })
          .then((user) =>
            res.status(200).json({ message: "Profil mis à jour !" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(404).json({ error: "Utilisateur inexistant !" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'un user ---------------------------------------------------------------------------------------
exports.deleteUser = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user.picture !== null) {
        // Si photo de profil présente la supprime du répertoire, puis on supprime l'user de la BDD
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.User.destroy({ where: { id: req.params.id } });
          res.status(200).json({ message: "Compte supprimé !" });
        });
      } else {
        // Sinon on supprime uniquement l'user
        db.User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Compte supprimé !" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};
