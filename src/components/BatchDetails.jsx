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
          <table className="details-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {oneBatch.ingredients.map((ingredient) => {
                return (
                  <tr key={ingredient.name}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.qty}</td>
                    <td>{ingredient.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default BatchDetails;
