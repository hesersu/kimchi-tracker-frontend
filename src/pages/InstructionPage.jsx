import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate ,useParams } from "react-router";

export const InstructionPage = () => {
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:5005/batches/${id}`)
      .then((res) => {
        console.log("Response for batch : ", res.data);
        // setCurrentBatch(res.data);
        axios
          .get(
            `http://localhost:5005/defaultRecipe/${res.data.recipeBasedOnId}`
          )
          .then((res) => {
            console.log("Response for recipe : ", res.data);
            setRecipe(res.data);
          });
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleCheck(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSteps([...steps, value]);
      console.log("steps.length", steps.length);
      console.log("recipe.directions.length", recipe.directions.length);
      if(steps.length+1 === recipe.directions.length){
        console.log("TRUE");
        setIsActive(true);
      }
    } else {
      setSteps(steps.filter((step) => step !== value));
      if(steps.length+1 !== recipe.directions.length){
        console.log("FALSE");
        setIsActive(false);
      }
    }
  }

  function navigateToNextPage(){
    navigate(`/create-recipe/${id}`);
  }

  return (
    <div className="container-flex-column-p-1">
      <h1>Instructions</h1>
      <p className="instruction-subtitle">
        Let yourself be guided by {recipe.author}
      </p>
      <ol className="instruction-list">
        {recipe.directions &&
          recipe.directions.map((step,index) => (
            <li className="instruction-list-item" key={`step_${index+1}`}>
              <input type="checkbox" name="step" id={`step_${index+1}`} value={`step_${index+1}`} onChange={handleCheck}/>
              {step}
            </li>
          ))}
      </ol>
      {
        isActive ? 
        <button onClick={navigateToNextPage}>Continue to register</button>
        :
        <button onClick={navigateToNextPage} disabled>Continue to register</button>
      }
    </div>
  );
};
