// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/users') // Utilsiation du modèle User
const pwdCtrl = require('../middleware/pwdControl'); // Importation du schéma permettant de contrôler la création de password

router.post('/signup', pwdCtrl, userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login', userCtrl.login); // Connexion d'un user existant 

module.exports = router; // Exportation du router
