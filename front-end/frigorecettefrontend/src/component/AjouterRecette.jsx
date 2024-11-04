import React from "react";

export const AjouterRecette = () => {
  function handleSubmitPlusPropre(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch('http://localhost:3000/ajouterrecette', {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
  }

  return (
    <div>
      AjouterRecette
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

        <label htmlFor="instructions">instructions</label>
        <input
          type="text"
          id="instructions"
          name="instructions"
          defaultValue=""
        />

        <label htmlFor="difficulte">difficulte</label>
        <input
          type="text"
          id="difficulte"
          name="difficulte"
          defaultValue=""
        />

        <label htmlFor="temps_preparation">temps_preparation</label>
        <input 
          type="number" 
          id="temps_preparation" name="temps_preparation" />

        <label htmlFor="ingredients">ingredients</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          defaultValue=""
        />

        <input type="submit" value="Rajouter la recette !" />
      </form>
    </div>
  );
};
