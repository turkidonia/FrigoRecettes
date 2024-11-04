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

/*app.post("/produits", (req, res) => {
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

/*app.get('/recettesmagiques', async (req, res) => {
  const produitsDisponibles = req.query.produits; // Récupère la liste des produits en paramètres

  try {
      const [recettes] = await db.execute(
          `SELECT recettes.nom 
FROM recettes
JOIN ingredients ON recettes.id = ingredients.recette_id
JOIN produits ON ingredients.produit_id = produits.id
WHERE produits.nom IN ('pomme', 'banane', 'fromage') 
GROUP BY recettes.id
HAVING COUNT(ingredients.id) = (SELECT COUNT(*) FROM ingredients WHERE recette_id = recettes.id);
`, 
          []
      );
      res.json(recettes);
  } catch (error) {
      console.error("Erreur lors de la récupération des recettes :", error);
      res.status(500).json({ message: "Erreur du serveur" });
  }
});*/

// Route POST pour ajouter un produit
app.post('/ajouterproduit', (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body;//on definie un objet avec 4 variables et attribue a chaque variable un champ de body de requete
  console.log(nom, date_expiration, categorie);

    // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
    // db.query(sql, [nom, quantity, datedexpi, category],

    db.query(`INSERT INTO produits (nom, quantite, date_expiration, categorie)
      VALUES
      ('${nom}', '${quantite}', '${date_expiration}', '${categorie}')`, 
      function (err, results, fields) {
        console.log("Resultats", results, err, fields);
        res.send('Post request to ajouter produit');
      }
    );

});

// Route POST pour ajouter une recette
app.post('/ajouterrecette', (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } = req.body;//on definie un objet avec 4 variables et attribue a chaque variable un champ de body de requete
  console.log(nom, difficulte, temps_preparation);

    // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
    // db.query(sql, [nom, quantity, datedexpi, category],

    db.query(`INSERT INTO recettes (nom, instructions, difficulte, temps_preparation, ingredients)
      VALUES
      ('${nom}', '${instructions}', '${difficulte}', '${temps_preparation}', '${ingredients}')`, 
      function (err, results, fields) {
        console.log("Resultats", results, err, fields);
        res.send('Post request to ajouter recette');
      }
    );

});