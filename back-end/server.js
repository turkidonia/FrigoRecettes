const express = require('express');       //importer express
const app = express();               //initialiser app
const port = 3000;              //definir le port du backend

app.listen(port, () => {        //demarrer le server.js
    console.log(`le backend démarre dans le port 3000`)
  })