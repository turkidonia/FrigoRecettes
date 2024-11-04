import React from "react";
import AfficherProduits from "./AfficherProduits";
import AfficherRecettes from "./AfficherRecettes";
import RecetteAvailable from "./RecetteAvailable";
import AjouterProduit from "./AjouterProduit";
import { AjouterRecette } from "./AjouterRecette";

export const Frigo = () => {
  return (
    <div>
      Frigo
      <AfficherProduits></AfficherProduits>
      <AfficherRecettes></AfficherRecettes>
      <RecetteAvailable></RecetteAvailable>
      <AjouterProduit />
      <AjouterRecette />
    </div>
  );
};
