import axios from "axios";
import { useEffect, useState } from "react";
import { IngredientInput } from "./IngredientInput";

export const IngredientForm = ({ selectedRecipe }) => {
  console.log(selectedRecipe);
  const [recipe, setRecipe] = useState([]); // 1 by default

  useEffect(() => {
    axios
      .get(`${API_URL}/coefficient/${selectedRecipe}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, [selectedRecipe]);

  console.log("Current recipe => ", recipe);
  return (
    <form>
      {recipe.ingredients &&
        recipe.ingredients.map((ingredient, index) => {
          console.log(ingredient);
          return <IngredientInput ingredient={ingredient} index={index} />;
        })}
    </form>
  );
};
