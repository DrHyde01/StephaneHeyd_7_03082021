// Mise en place des routes concernant la gestion des posts ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/posts');

// Posts
router.post('/add', auth, multer, postCtrl.createPost); // Création d'un post
router.get('/:id', auth, postCtrl.getOnePost); // Obtention d'un post via l'user id
router.get('/', auth, postCtrl.getAllPosts); // Obtention de tout les posts
router.put('/:id', auth, multer, postCtrl.updatePost); // Modification d'un post
router.delete('/:id', auth, multer, postCtrl.deletePost); // Suppression d'un post

/*// Commentaires
router.post('/:id/comments', auth, postCtrl.createComment);
router.delete('/comments/:id', auth, postCtrl.deleteComment);

// Likes
router.post('/:id/likes', auth, postCtrl.addLike);
router.delete('/likes/:id', auth, postCtrl.deleteLike);*/

module.exports = router;
