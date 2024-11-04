import React from "react";

export const AjouterProduit = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form); //le target cest un champ ou une entree cest la m chose
    const formJson = Object.fromEntries(formData.entries()); //jai un objet et je vais lire depuis de ses entres (formdataentries)
    fetch('http://localhost:3000/ajouterproduit', 
        {
      //fetch permet de faire une requete http
      method: form.method,
      headers: {
        // cest l'en tete
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson), //contenu dans le payload
    });
  }

  return (
    <div>
      AjouterProduit
      <form method="post" onSubmit={handleSubmitPlusPropre}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="name"
          name="nom"
          required
          minLength="4"
          maxLength="18"
          size="10"
          defaultValue=""
        />

        <label htmlFor="date_expiration">Date d'expiration</label>
        <input
          type="date"
          id="date_expiration"
          name="date_expiration"
          value="2018-07-22"
          min="2018-01-01"
          max="2025-12-31"
          defaultValue="2024-10-20"
        />

        <label htmlFor="categorie">Categorie</label>
        <input
          type="text"
          id="categorie"
          name="categorie"
          required
          minLength="4"
          maxLength="8"
          size="10"
          defaultValue=""
        />

        <label htmlFor="quantite">Quantité</label>

        <input 
         type="number" 
         id="quantite" 
         name="quantite"
         min="1" 
         max="100"
         defaultValue="1" 
        />

        <input type="submit" value="Rajouter le produit !" />
      </form>
    </div>
  );
};

export default AjouterProduit;
