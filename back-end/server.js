const express = require("express"); //importer express: le serveur tourne tout le temps: en recherche active

const mysql = require("mysql2"); // Pour se connecter à MySQL
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express(); //initialiser l'application: la methode  express

const port = 3000; //definir le port du backend

app.use(cors()); // autorise toutes les origines à accéder aux endpoints
const uri =
  "mongodb+srv://belhoulaturkidonia:Dandoun1983@clusterfrigo.ebifl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFrigo";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
/*db.query("SELECT * FROM produits", (err, results) => {
  if (err) {
    console.error("Erreur lors de la requête SQL :", err);
    return;
  }
  console.log("Résultats :", results);
});*/

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
app.post("/ajouterproduit", (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body; //on definie un objet avec 4 variables et attribue a chaque variable un champ de body de requete
  console.log(nom, date_expiration, categorie);

  // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
  // db.query(sql, [nom, quantity, datedexpi, category],

  db.query(
    `INSERT INTO produits (nom, quantite, date_expiration, categorie)
      VALUES
      ('${nom}', '${quantite}', '${date_expiration}', '${categorie}')`,
    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send("Post request to ajouter produit");
    }
  );});

// Route POST pour ajouter une recette
app.post("/ajouterrecette", (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } =
    req.body; //on definie un objet avec 4 variables et attribue a chaque variable un champ de body de requete
  console.log(nom, difficulte, temps_preparation);

  // const sql =`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)`
  // db.query(sql, [nom, quantity, datedexpi, category],

  db.query(
    `INSERT INTO recettes (nom, instructions, difficulte, temps_preparation, ingredients)
      VALUES
      ('${nom}', '${instructions}', '${difficulte}', '${temps_preparation}', '${ingredients}')`,
    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send("Post request to ajouter recette");
    }
  );});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();  il faut mettre en commentaire le close connection car jai besoin de se connecter a ma BDD
    AfficherMesCollections();
    //SuppressionUserInsteadOne();
    GetIfOfAnUser("sean_bean@gameofthron.es");

  }
}


 function AfficherMesCollections(){
  const dbName = "sample_mflix";
  const db = client.db(dbName);
  db.listCollections()
    .toArray()
    .then((cols)=>
      cols.map((col, index) => {
        console.log(`Collections ${index} :`,col)
    })
  );
}

/*async function SuppUserInsteadOne(){
  const dbName = "sample_mflix";
  const db = client.db(dbName);
  const usersCollection = await db.collection('users');
  const req = {_id: {$ne: new ObjectId("59b99db4cfa9a34dcd7885b6")}}
  const result = await usersCollection.deleteMany(req);
  console.log(result);
}

async function SuppressionUserInsteadOne(){
  const db = SelectGoodDB("sample_mflix");
  const usersCollection = db.collection('users');
  const req = { _id: { $ne: new ObjectId("59b99db4cfa9a34dcd7885b6") } }
  //const result = await usersCollection.deleteMany(req);
  console.log(result)
}*/


// ALTER les deux tables produits et ingredients pour ajouter une colonne idUser
    // ça se fait dans le SQL shell
// Modifier les points d'api pour qui prennent un id d'utilisateur (back)
// Modifier les appels front pour que les requêtes passes un id d'utilisateurs (front)
// Crée en front un formulaire pour la connexion et un formulaire l'inscription (front)
// Crée deux endpoint login et un endpoint inscription (back)
// Crée un endpoint qui récupère l'utilisateur actuel (back)

function SelectGoodDB(dbName) { 
  return client.db(dbName);
}

async function GetIfOfAnUser(emailOfUser) {
  const db = SelectGoodDB("sample_mflix")
  const usersCollection = db.collection('users');
  const req = { email : emailOfUser}
  const result = await usersCollection.findOne(req)
  console.log("MonUser", result._id)
  return result._id
}


app.post("/inscription", async (req, res)=> {
  const {name, email, password} = req.body;
  console.log("req body", req.body)
  const db = SelectGoodDB("sample_mflix")
  const usersCollection = db.collection('users');
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  const result = await usersCollection.insertOne({name, email, passwordHashed })
  console.log(result)
  return res.send("Utilisateur crée avec succès")
})


run().catch(console.dir);

//endpoint de  connection 
//post ou get à définir
//je recupere ce que j'ai dans le body
//je fais une requete mongodb pour voir si y'a bien un email qui existe 
//ensuite vu que j'ai fait une requete en amont, j'en profite pour
//recuperer le mot de passe hashé 
//j'utilise bcrypt pour voir si le mot de passe que j'ai recu en clair
//est la meme que celui qui est haché
//je renvoie à l'utilisteur soit connexion réussi soit connexion échoué  


app.post("/connexion", async (req, res)=> {//on ecoute les requetes post qui est sur la route connecxion
  const { email, password} = req.body;   // on lit le body et on stocke email et pass dans une constante
  console.log("req body", req.body)
  const db = SelectGoodDB("sample_mflix"); 
  const usersCollection = db.collection('users');      //on selectionne la collection users
  const utilisateurFind = await usersCollection.findOne({email});
  
  if (utilisateurFind) {
    const passwordHashedTrueOrNot = await bcrypt.compare(
      password, 
      utilisateurFind.passwordHashed
    );
    
   return res.send(passwordHashedTrueOrNot ? "Connecté avec succés " :  "le mot de passe n'existe pas")
  } else {
    console.log("utilisateur n'existe pas")
  }

});
