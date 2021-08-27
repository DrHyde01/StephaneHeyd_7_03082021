// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/users') // Utilsiation du modèle User
const pwdCtrl = require('../middleware/pwdControl'); // Importation du schéma permettant de contrôler la création de password

router.post('/signup', pwdCtrl, userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login', userCtrl.login); // Connexion d'un user existant 
router.get('/accounts', auth, userCtrl.getAllUsers); // Récupération de tout les users
router.get('/accounts/:id', auth, userCtrl.getUser); // Récupération des informations d'un user
router.put('/accounts/:id', auth, multer, userCtrl.updateUser); // Mise à jour d'un user
router.delete('/accounts/:id', auth, userCtrl.deleteUser); // Suppression d'un user

module.exports = router; // Exportation du router
