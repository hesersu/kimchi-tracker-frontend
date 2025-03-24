export const IngredientInput = (props) => {
  console.log(props);
  return (
    <div>
      <input type="number" name="foo" id={`input_ingredient_`} />
      <label htmlFor="foo">Label</label>
    </div>
  );
};
