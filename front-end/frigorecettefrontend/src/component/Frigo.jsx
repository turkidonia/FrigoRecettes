import React from "react";
import AfficherProduits from "./AfficherProduits";
import AfficherRecettes from "./AfficherRecettes";
import RecetteAvailable from "./RecetteAvailable";

export const Frigo = () => {
  return (
    <div>
      Frigo
      <AfficherProduits></AfficherProduits>
      <AfficherRecettes></AfficherRecettes>
      <RecetteAvailable></RecetteAvailable>
    </div>
  );
};
