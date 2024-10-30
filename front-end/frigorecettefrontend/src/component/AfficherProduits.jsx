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
  useEffect(() => {
    console.log("test")
    getProduit();
  }, []);

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
