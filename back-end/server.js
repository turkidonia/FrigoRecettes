const express = require('express');       //importer express
const app = express();               //initialiser l'application express
const mysql = require('mysql2'); // Pour se connecter à MySQL
const port = 3000;              //definir le port du backend


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {        //demarrer le server.js
    console.log(`le backend démarre et écoute sur le port 3000`)
  })

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'frigo_recettes'
  });
  
  // Vérifiez la connexion
  db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
  });