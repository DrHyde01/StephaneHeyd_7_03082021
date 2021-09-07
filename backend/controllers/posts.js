const db = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Création d'un post --------------------------------------------------------------------------
exports.createPost = (req, res, next) => {
  // Nous avons besoin de récupérer l'userId par l'intermédiaire du token
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  // Nous cherchons ensuite l'user correspondant
  db.User.findOne({
    attributes: ["id", "username", "picture"],
    where: {
      id: userId,
    },
  })
    // Et enregistrons son post dans la BDD
    .then(() => {
      const imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.body.filename
      }`; // A vérifier pour req.file.filename

      db.Post.create({
        message: req.body.message,
        imageURL: imageUrl,
        link: req.body.link,
        UserId: userId,
      }).then(() => res.status(201).json({ message: "Post créé !" }));
    })

    .catch((error) => res.status(400).json({ error }));
};

// Obtention d'un post par l'user id ------------------------------------------------------------------
exports.getOnePost = (req, res, next) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
    // On inclue également les infos user, like, comment, liées au post
    include: [
      {
        model: db.User,
        attributes: ["username", "picture", "id"],
      },
      {
        model: db.Like,
        attributes: ["PostId", "UserId"],
        include: [
          {
            model: db.User,
            attributes: ["username", "picture"],
          },
        ],
      },
      {
        model: db.Comment,
        order: [["createdAt", "DESC"]], // Affichage des commentaires dans un ordre donné
        attributes: ["comment", "UserId"],
        include: [
          {
            model: db.User,
            attributes: ["username", "picture"],
          },
        ],
      },
    ],
  })
    .then((post) => res.status(200).json(post))

    .catch((error) => res.status(500).json({ error }));
};

// Obtention de tout posts confondus ---------------------------------------------------------------
exports.getAllPosts = (req, res, next) => {
  db.Post.findAll({
    attributes: [
      "id",
      "message",
      "imageURL",
      "link",
      "createdAt",
      "updatedAt",
      "UserId",
    ],

    order: [["createdAt", "DESC"]],

    include: [
      {
        model: db.User,
        attributes: ["username", "picture", "id"],
      },
      {
        model: db.Like,
        attributes: ["PostId", "UserId"],
        include: [
          {
            model: db.User,
            attributes: ["username", "picture"],
          },
        ],
      },
      {
        model: db.Comment,
        order: [["createdAt", "DESC"]],
        attributes: ["comment", "UserId"],
        include: [
          {
            model: db.User,
            attributes: ["username", "picture"],
          },
        ],
      },
    ],
  })
    .then((posts) => res.status(200).json(posts))

    .catch((error) => res.status(500).json({ error }));
};

// Mise à jour d'un post -----------------------------------------------------------------------------
exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.body.filename
        }`,
      }
    : { ...req.body };
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post) {
        db.Post.update(postObject, {
          where: { id: req.params.id },
        })
          .then(() => res.status(200).json({ message: "Post mis à jour !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(404).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'un post -------------------------------------------------------------------
exports.deletePost = (req, res, next) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post.imageURL !== null) {
        const filename = post.imageURL.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy(
            { where: { id: post.id } },
            { truncate: true, restartIdentity: true }
          );
          res.status(200).json({ message: "Post supprimé !" });
        });
      } else {
        // Sinon on supprime uniquement l'user
        db.Post.destroy(
          { where: { id: post.id } },
          { truncate: true, restartIdentity: true }
        );
        res.status(200).json({ message: "Post supprimé !" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};
