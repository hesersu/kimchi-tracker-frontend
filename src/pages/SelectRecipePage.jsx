import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import maangchiImage from "../assets/emily-kim.png";
import jongwonImage from "../assets/paik-jong-won.png";
import { API_URL } from "../../config/apiConfig";

export const SelectRecipePage = () => {
  const [recipeBaseSelected, setrecipeBaseSelected] = useState(1); // here 1 is the ID of the default recipe

  const [recipe, setRecipe] = useState([]); // 1 by default

  const [ingredientsQty, setIngredientsQty] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL}/defaultRecipe/${recipeBaseSelected}`)
      .then((res) => {
        setRecipe(res.data);
        setIngredientsQty(res.data.ingredients);
      })
      .catch((err) => console.log(err));
  }, [recipeBaseSelected]);

  function handleCabbage(e) {
    const newIngredientsQty = ingredientsQty.map((ingredient, index) => {
      const updatedIngredient = {};
      if (ingredient.name !== "Cabbage") {
        (updatedIngredient.name = ingredient.name),
          (updatedIngredient.qty =
            Math.round(
              recipe.ingredients[index].qty * Number(e.target.value) * 10
            ) / 10),
          (updatedIngredient.unit = ingredient.unit);
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
      chef: recipeBaseSelected == 1 ? "Maangchi" : "Paik Jong-Won",
      userId: 1,
      ingredients: ingredientsQty,
    };
    try {
      const res = await axios.post(`${API_URL}/batches`, newBatch);
      console.log("New batch in progress...", res.data);
      navigate(`/instructions/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="main-container">
      <div className="recipe-selector-container">
        <button
          onClick={() => setrecipeBaseSelected(1)}
          className={
            recipeBaseSelected == 1
              ? "recipe-selector-btn recipe-selector-btn-selected"
              : "recipe-selector-btn"
          }
        >
          <img
            src={maangchiImage}
            alt="maangchi chef"
            className="recipe-selector-img"
          />
          Maangchi (Emily Kim) Traditional Napa Cabbage Kimchi Recipe
        </button>
        <button
          onClick={() => setrecipeBaseSelected(3)}
          className={
            recipeBaseSelected == 3
              ? "recipe-selector-btn recipe-selector-btn-selected"
              : "recipe-selector-btn"
          }
        >
          <img
            src={jongwonImage}
            alt="jongwon chef"
            className="recipe-selector-img"
          />
          Paik Jong-Won Traditional Napa Cabbage Kimchi Recipe
        </button>
      </div>
      <div className="recipe-selector-form-container">
        <p>
          You are currently selecting{" "}
          <span className="recipe-selector-highlight">
            the{" "}
            {recipe
              ? `${recipe.name} Recipe`
              : "Maangchi (Emily Kim) Traditional Napa Cabbage Kimchi Recipe"}
          </span>
        </p>
        <form
          action="POST"
          onSubmit={handleSubmit}
          className="recipe-selector-form"
        >
          {ingredientsQty &&
            ingredientsQty.map((ingredient) => {
              return ingredient.name === "Cabbage" ? (
                <div
                  key={`recipe-selector-${ingredient.name.replace(" ", "-")}`}
                >
                  <div className="recipe-selector-form-control">
                    <label htmlFor="cabbageInput">
                      Amount of cabbage (kg):{" "}
                    </label>
                    <input
                      type="number"
                      id="cabbageInput"
                      name="cabbageQty"
                      step="0.1"
                      value={ingredient.qty}
                      onChange={handleCabbage}
                      className="recipe-selector-input"
                    />
                  </div>
                  <p className="recipe-selector-footnote">
                    (Adjust the quantity of cabbage needed to calculate all the
                    ingredients)
                  </p>
                </div>
              ) : (
                <p
                  key={`recipe-selector-${ingredient.name.replace(" ", "-")}`}
                  className="recipe-selector-list-item"
                >
                  {ingredient.name} :{" "}
                  <span className="recipe-selector-space">
                    {ingredient.qty} {ingredient.unit}
                  </span>
                </p>
              );
            })}

          <div className="continue-btn-container">
            <button type="submit" className="continue-btn">
              Next
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
