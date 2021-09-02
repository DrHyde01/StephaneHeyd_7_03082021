const db = require("../models");
const jwt = require("jsonwebtoken");

// Ajout d'un like et suppression de ce dernier si il est déjà présent -----------------------------------
exports.addLike = async (req, res, next) => {
  // async await necessaires !
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    const userLike = await db.Like.findOne({
      // On vérifie si un like est déjà présent
      where: {
        UserId: userId,
        PostId: req.params.postId,
      },
    });

    if (userLike) {
      // Si oui on le supprime de la BDD
      await db.Like.destroy({
        where: {
          UserId: userId,
          PostId: req.params.postId,
        },
      });
      res.status(200).json({ message: "Post disliké" });
    } else {
      // Sinon le rajoute
      db.Like.create({
        UserId: userId,
        PostId: req.params.postId,
      });
      res.status(201).json({ messageRetour: "Post liké" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
