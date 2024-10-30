const express = require("express"); //importer express: le serveur tourne tout le temps: en recherche active
const app = express(); //initialiser l'application: la methode  express
const mysql = require("mysql2"); // Pour se connecter à MySQL
const port = 3000; //definir le port du backend
const cors = require("cors");
app.use(cors()); // autorise toutes les origines à accéder aux endpoints

app.get("/", (req, res) => {
  res.send("Hello World!"); //hello word est envoyé dans un consolelog et pas en response
});

app.listen(port, () => {
  //demarrer le server.js
  console.log(`le backend démarre et écoute sur le port 3000`);
});

const db = mysql.createConnection({
  //la methode createconnection prend comme parametre config et elle est de type connection
  host: "localhost",
  user: "root",
  password: "password",
  database: "frigo_recettes",
});

// Vérifiez la connexion
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Exécutez: effectuez une requête SQL puisque je suis connecte à ma BDD
db.query("SELECT * FROM produits", (err, results) => {
  if (err) {
    console.error("Erreur lors de la requête SQL :", err);
    return;
  }
  console.log("Résultats :", results);
});

// Fermez la connexion après l'exécution
//db.end();


app.use(express.json());

app.get("/produits", (req, res) => {
  db.query("SELECT * FROM produits", function (err, results, fields) {
    console.log("Erreur lors de la requête SQL :", err);
    console.log("Cest mon résultat de la requête SQL :", results);
    console.log("Mes champs :", fields);
    res.send(results);
  });
});

app.get("/recettes", (req, res) => {
  db.query("SELECT * FROM recettes", (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      return;
    }
    res.send(results); //on renvoie que du json donc entre parenthese on met que la variable
  });
});

app.post("/produits", (req, res) => {
  db.query(
    "INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ('poisson', 5, '2024-12-20', 'poisson')",
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête SQL :", err);
        return;
      }
      res.send(results); //on renvoie que du json donc entre parenthese on met que la variable
    }
  );
});
