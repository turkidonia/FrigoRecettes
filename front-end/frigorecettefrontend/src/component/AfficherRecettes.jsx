import axios from "axios";
import { useEffect, useState } from "react";

const AfficherRecettes= () => {
  const [mesrecettes, setMesrecettes] = useState([]);
  async function getRecette() {
    try {
      const response = await axios.get("http://localhost:3000/recettes");
      console.log(response.data);
      setMesrecettes(response.data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {//appel de API du backend pour afficher les recettes dans le front
    console.log("test")
    getRecette();
  }, []);//on met tableau vide comme depandence de useEffect: lexecution de use effect qu'apres l'initialisation du tableau

  return (
    <div>
    <h1>Recettes</h1>
    <div>{mesrecettes.map((marecette) => (
      <p key={marecette.id}>{marecette.nom}</p>
    ))}
    </div>
  </div>
  );  
};
export default AfficherRecettes;
