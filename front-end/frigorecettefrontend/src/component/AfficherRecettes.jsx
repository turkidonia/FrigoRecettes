import axios from "axios";
import { useEffect, useState } from "react";

export function AfficherRecettes() {
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/recettes")
      .then((response) => setRecettes(response.data))
      .catch((error) => console.error("Erreur lors de la requête :", error));
  }, []);

  return (
    <div>
      <h1>Les Recettes</h1>
      <ul>
        {/* {recettes.map((recette) => (
          <li key={recette.id}>
            {recette.nom} - {recette.quantite}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default AfficherRecettes;
