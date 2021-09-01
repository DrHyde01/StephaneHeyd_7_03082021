const db = require("../models");
const jwt = require("jsonwebtoken");

// Création d'un commentaire -----------------------------------------------------
exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  db.Post.findOne({
    where: {
      id: req.params.id,
      UserID: userId,
    },
  });
  db.Comment.create({
    comment: req.body.comment,
    PostId: req.params.postId,
    UserId: userId,
  })
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))

    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un commentaire ---------------------------------------------------
exports.deleteComment = (req, res, next) => {
    db.Post.findOne({
        where: {
          id: req.params.postId,
        },
      });
      db.Comment.destroy({
        where: {
            id: req.params.id,
          },
        })
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    
        .catch((error) => res.status(400).json({ error }));
   
};
