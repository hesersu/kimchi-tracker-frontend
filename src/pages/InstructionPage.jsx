import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../config/apiConfig";

export const InstructionPage = () => {
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/batches/${id}`)
      .then((res) => {
        console.log("Response for batch : ", res.data);
        // setCurrentBatch(res.data);
        axios
          .get(`${API_URL}/defaultRecipe/${res.data.recipeBasedOnId}`)
          .then((res) => {
            // console.log("Response for recipe : ", res.data);
            setRecipe(res.data);
          });
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleCheck(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSteps([...steps, value]);
      // console.log("steps.length", steps.length);
      // console.log("recipe.directions.length", recipe.directions.length);
      if (steps.length + 1 === recipe.directions.length) {
        // console.log("TRUE");
        setIsActive(true);
      }
    } else {
      setSteps(steps.filter((step) => step !== value));
      if (steps.length + 1 !== recipe.directions.length) {
        // console.log("FALSE");
        setIsActive(false);
      }
    }
  }

  function navigateToNextPage() {
    navigate(`/create-recipe/${id}`);
  }

  return (
    <main className="main-container">
      <div className="instruction-container">
        <h2 className="instruction-title">Instructions</h2>
        <p className="instruction-subtitle">
          Let yourself be guided by{" "}
          <span className="instruction-subtitle-highlight">
            {recipe.author}
          </span>
        </p>
        <ol className="instruction-list">
          {recipe.directions &&
            recipe.directions.map((step, index) => (
              <li className="instruction-list-item" key={`step_${index + 1}`}>
                <input
                  type="checkbox"
                  name="step"
                  id={`step_${index + 1}`}
                  value={`step_${index + 1}`}
                  onChange={handleCheck}
                  className="instruction-list-checkbox"
                />
                {step}
              </li>
            ))}
        </ol>
        {isActive ? (
          <div className="continue-btn-container continue-btn-container-lg">
            <button onClick={navigateToNextPage} className="continue-btn">
              Next
            </button>
          </div>
        ) : (
          <div className="continue-btn-container continue-btn-container-lg">
            <button
              onClick={navigateToNextPage}
              disabled
              className="continue-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
