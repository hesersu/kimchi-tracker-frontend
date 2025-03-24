export const SelectRecipePage = () => {
  const [recipeBaseSelected, setrecipeBaseSelected] = useState(1); // here 1 is the ID of the default recipe
  return (
    <>
      <div>SelectRecipePage</div>
      <button onClick={() => setrecipeBaseSelected(1)}>Recipe 1</button>
      <button onClick={() => setrecipeBaseSelected(2)}>Recipe 2</button>
      <p>{recipeBaseSelected}</p>
    </>
  );
};
