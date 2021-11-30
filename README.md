# Projet 7 OpenClassrooms
## Groupomania  :raised_hands:	

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Dernier effort pour le parcours WebDev de Openclassrooms, ce projet repose sur la création d'un réseau social 
d'entreprise en se basant sur l'usage d'un framework et des compétances acquises tout le long du parcours. 

Le projet Groupomania repose sur les axes suivants :  

* L'affichage de contenus personnalisés en fonction de l'utilisateur connecté
* La communication serveur - client par l'intermédiaire d'une API 
* Le stockage et la récupération d'informations au travers d'une base de données SQL
* L'utilisation d'un framework côté front (ici Vue.js)
* La sécurisation de l'application dans son ensemble

### Installation :computer:  
***
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
* Vérifiez que vos identifiants de base de données correspondent avec ceux renseignés dans le fichier .env disponible dans le dossier Backend. Dans le cas échéant modifiez les au sein du fichier
* Importez enfin le fichier .sql disponible dans le dossier DB du Backend en tapant la commande suivante : `mysql -u votreidentifiant -p groupomania < sauvegarde.sql`

#### Enfin vous pouvez accèder à l'application ! 
* Lancez la via http://localhost:8080/
* Un compte admin est déjà disponible, connectez-vous avec l'identifiant `Admin`et le mot de passe `Admin12345@`
* ENJOY ! 🙂

### Complément : API Guidelines :mag:
***
* https://documenter.getpostman.com/view/16558990/UUxxhUAG