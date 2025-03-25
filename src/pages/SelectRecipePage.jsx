import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import { IngredientForm } from "../components/IngredientForm"
export const SelectRecipePage = () => {
  const [recipeBaseSelected, setrecipeBaseSelected] = useState(1); // here 1 is the ID of the default recipe

  const [recipe, setRecipe] = useState([]); // 1 by default

  const [ingredientsQty, setIngredientsQty] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5005/defaultRecipe/${recipeBaseSelected}`)
      .then((res) => {
        setRecipe(res.data);
        setIngredientsQty(res.data.ingredients);
      })
      .catch((err) => console.log(err));
  }, [recipeBaseSelected]);

  function handleCabbage(e) {
    const newIngredientsQty = ingredientsQty.map((ingredient, index) => {
      const updatedIngredient = {};
      if (ingredient.name !== "cabbage") {
        (updatedIngredient.name = ingredient.name),
          (updatedIngredient.qty =
            recipe.ingredients[index].qty * Number(e.target.value)),
            updatedIngredient.unit = ingredient.unit;
      } else {
        (updatedIngredient.name = ingredient.name),
          (updatedIngredient.qty = e.target.value),
          (updatedIngredient.unit = ingredient.unit);
      }
      return updatedIngredient;
    });
    setIngredientsQty(newIngredientsQty);
  }

  console.log("ingredientsQty ===> ", ingredientsQty);
  console.log("recipe => ", recipe);

  async function handleSubmit(e) {
    e.preventDefault();
    const newBatch = {
      name: "",
      imageUrl: "",
      createdAt: "",
      recipeBasedOnId: recipeBaseSelected,
      userId: 1,
      ingredients: ingredientsQty
    }
    try{
      const res = await axios.post("http://localhost:5005/batches", newBatch);
      console.log("New batch in progress...", res.data);
      navigate(`/instructions/${res.data.id}`);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Select your base recipe</h1>
      <div className="recipe-selected-btn-container">
        <button
          onClick={() => setrecipeBaseSelected(1)}
          className="recipe-selected-btn"
        >
          Maangchi Traditional Napa Cabbage Kimchi Recipe
        </button>
        <button
          onClick={() => setrecipeBaseSelected(3)}
          className="recipe-selected-btn"
        >
          Jongwon Baek Cabbage Kimchi Recipe
        </button>
      </div>
      <div className="container-flex-column-p-1">
        <p>I choose the : {recipe ? `${recipe.name} Recipe` : " Maangchi Traditional Napa Cabbage Kimchi Recipe"}</p>
        <form action="POST" onSubmit={handleSubmit}>
          {ingredientsQty &&
            ingredientsQty.map((ingredient) => {
              return ingredient.name === "cabbage" ? (
                <div className="form-control">
                  <label htmlFor="cabbageInput">Amount of Cabbage (kg): </label>
                  <input
                  type="number"
                  id="cabbageInput"
                  name="cabbageQty"
                  step="0.001"
                  value={ingredient.qty}
                  onChange={handleCabbage}
                />
                <p><small>(Adjust the quantity of cabbage needed to calculate all the ingredients)</small></p>
                </div>
                
              ) : (
                <p>
                  {ingredient.name} : {ingredient.qty} {ingredient.unit}
                </p>
              );
            })}
          <button type="submit" className="recipe-selected-btn">Create</button>
        </form>
        
      </div>
    </>
  );
};
