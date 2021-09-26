# Projet 7 OpenClassrooms
## Groupomania  :raised_hands:	

Dernier effort pour le parcours WebDev de Openclassrooms, ce projet repose sur la création d'un réseau social 
d'entreprise en se basant sur l'usage d'un framework et des compétances acquises tout le long du parcours. 

Le projet Groupomania repose sur les axes suivants :  

* L'affichage de contenus personnalisés en fonction de l'utilisateur connecté
* La communication serveur - client par l'intermédiaire d'une API 
* Le stockage et la récupération d'informations au travers d'une base de données SQL
* L'utilisation d'un framework côté front (ici Vue.js)
* La sécurisation de l'application dans son ensemble

### Installation :computer:
=

Clonez le repo : `https://github.com/DrHyde01/StephaneHeyd_7_03082021.git` 

#### Pour lancer le frontend : 
* Placez vous dans le dossier frontend
* Dans le terminal exécutez la commande `npm install`
* Lancez ensuite la commande `npm run serve`
* L'interface client est disponible à l'URL suivante : http://localhost:8080/

#### Pour le backend suivez ces instructions :
* Placez vous dans le dossier backend
* Initialisez les packages via la commande `npm install`
* Lancez le backend en tapant ensuite `nodemon`
* Vérifiez bien que le backend communique via le port `:3000`

#### Mettez en place la base de données de cette manière :
* Connectez vous au serveur MySQL
* Lancez la commande suivante pour créer la base de données : `CREATE DATABASE groupomania`
* Récupérez l'identifiant de connexion dans le fichier .env situé à la racine du dossier Backend
* Importez enfin le fichier .sql disponible dans le dossier DB du Backend en tapant la commande suivante : `mysql -u DrHyde -p groupomania < groupomania.sql`

#### Enfin vous pouvez accèder à l'application ! 
* Lancez la via http://localhost:8080/
* Un compte admin est déjà disponible, connectez-vous avec l'identifiant `Admin`et le mot de passe `Admin12345@`
* ENJOY ! 🙂

#### Complément : API Guidelines 
=
https://documenter.getpostman.com/view/16558990/UUxxhUAG