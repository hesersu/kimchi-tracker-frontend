import axios from "axios";
import "../components/BatchDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const BatchDetails = () => {
  const { batchId } = useParams();
  const [oneBatch, setOneBatch] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/batches/?id=${batchId}`)
      .then((res) => setOneBatch(res.data[0]))
      .catch((err) => console.log(err));
  }, [batchId]);

  //   console.log(oneBatch);
  if (!oneBatch) {
    return <div>Batch is not found!</div>;
  }

  return (
    <div>
      <div className="details-container">
        <section className="details-image">
          <img src={oneBatch.imageUrl} alt={oneBatch.name} />
        </section>
        <section className="details-description">
          <h2>{oneBatch.name}</h2>
          <h3>Recipe</h3>
          <ul>
            {oneBatch.ingredients.map((ingredient) => {
              return (
                <li key={ingredient.name}>
                  {ingredient.name} {ingredient.qty} {ingredient.unit}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BatchDetails;
