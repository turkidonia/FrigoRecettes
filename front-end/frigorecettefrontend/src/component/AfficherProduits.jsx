import axios from "axios";
import { useEffect, useState } from "react";

const AfficherProduits = () => {
  const [mesproduits, setMesproduits] = useState([]);
  async function getProduit() {
    try {
      const response = await axios.get("http://localhost:3000/produits");
      console.log(response.data);
      setMesproduits(response.data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {//appel de API du backend pour afficher les produits dans le front
    console.log("test")
    getProduit();
  }, []);//on met tableau vide comme depandence de useEffect: lexecution de use effect qu'apres l'initialisation du tableau

  return (
    <div>
    <h1>Produits</h1>
    <div>{mesproduits.map((monproduit) => (
      <p key={monproduit.id}>{monproduit.nom}</p>
    ))}
    </div>
  </div>
  );
  
};
export default AfficherProduits;
