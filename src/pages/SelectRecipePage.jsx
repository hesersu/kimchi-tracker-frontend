import { useEffect, useState } from "react";
import axios from "axios";
// import { IngredientForm } from "../components/IngredientForm"
export const SelectRecipePage = () => {
  const [recipeBaseSelected, setrecipeBaseSelected] = useState(1); // here 1 is the ID of the default recipe
  
  const [recipe, setRecipe] =  useState([]); // 1 by default

  const [ingredientsQty, setIngredientsQty] = useState([]);

  useEffect(()=>{
    axios
      .get(`http://localhost:5005/coefficient/${recipeBaseSelected}`)
      .then(res => {
        setRecipe(res.data);
        setIngredientsQty(res.data.ingredients);
      })
      .catch(err => console.log(err))
  }, [recipeBaseSelected]);

  function handleCabbage(e){
    console.log(e.target.value);
    const newIngredientsQty = ingredientsQty.map((ingredient, index) => {
      const updatedIngredient = {};
      if(ingredient.name !== "cabbage"){
        updatedIngredient.name = ingredient.name,
        updatedIngredient.qty= recipe.ingredients[index].qty * Number(e.target.value)
      } else {
        updatedIngredient.name = ingredient.name,
        updatedIngredient.qty= e.target.value
      }
      return updatedIngredient;
    });
    console.log("newIngredientsQty : ", newIngredientsQty)
    setIngredientsQty(newIngredientsQty);
  }
  console.log("ingredientsQty ===> ", ingredientsQty);

  function handleCreate(){
    console.log("Create...");
    axios
      .get("http://localhost:5005/users/1")
      .then(res=>{
        
        
        console.log("current user:",res.data)
        const updatedBatch = [...res.data.batch, ingredientsQty]


        console.log("ingredientsQty=> ",ingredientsQty);
        axios
        .patch("http://localhost:5005/users/1", {
          batch: updatedBatch
        })
        .then(response => {
          console.log("batch created user updated : ", response);
        })
        .catch((err) => console.log(err))
      
      })
  }

  return (
    <>
      <div>SelectRecipePage</div>
      <button onClick={() => setrecipeBaseSelected(1)}>Recipe 1</button>
      <button onClick={() => setrecipeBaseSelected(2)}>Recipe 2</button>
      <p>I choose the recipe n°{recipeBaseSelected}</p>
      {/* <IngredientForm selectedRecipe={recipeBaseSelected}/> */}
      {
        ingredientsQty && ingredientsQty.map(
        ingredient => {
          return ingredient.name === "cabbage" ? 
          <input type="number" id="cabbageInput" name="cabbageQty" step="0.001" value={ingredient.qty} onChange={handleCabbage}/>
          :
          <p>{ingredient.name} : {ingredient.qty} ... unity</p>
      })
      }
      <button onClick={handleCreate}>Create</button>
    </>
  );
};
