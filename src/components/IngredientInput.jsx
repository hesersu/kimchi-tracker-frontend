export const IngredientInput = ({ingredient, index}) => {
  console.log(ingredient);
  return (
    <div>
      <input type="number" name={ingredient.name} id={`${index}_${ingredient.name}`} value={ingredient.qty}/>
      <label htmlFor={`${index}_${ingredient.name}`}>{ingredient.name}</label>
    </div>
  );
};
