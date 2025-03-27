import axios from "axios";
import "../components/BatchDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../config/apiConfig";

const BatchDetails = () => {
  const { batchId } = useParams();
  const [oneBatch, setOneBatch] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/batches/?id=${batchId}`)
      .then((res) => setOneBatch(res.data[0]))
      .catch((err) => console.log(err));
  }, [batchId]);

  //   console.log(oneBatch);
  if (!oneBatch) {
    return <div>Batch is not found!</div>;
  }

  return (
    <div className="detail-container">
      <section className="detail-image-container">
        <img
          src={oneBatch.imageUrl}
          alt={oneBatch.name}
          className="detail-image"
        />
      </section>
      <section className="detail-description-container">
        <h2 className="detail-description-title">{oneBatch.name}</h2>
        <p className="detail-description-mini">
          (Batch created on : {oneBatch.createdAt})
        </p>
        <p>Base on a recipe of: {oneBatch.chef}</p>
      </section>
      <section className="detail-ingredient-container">
          <table className="detail-table">
            <thead className="detail-table-title">
              <tr>
                <th className="detail-table-title-item">Ingredient</th>
                <th className="detail-table-title-item">Quantity</th>
                <th className="detail-table-title-item">Unit</th>
              </tr>
            </thead>
            <tbody>
              {oneBatch.ingredients.map((ingredient) => {
                return (
                  <tr key={ingredient.name}>
                    <td className="detail-table-ingredient-item">{ingredient.name}</td>
                    <td className="detail-table-ingredient-item">{ingredient.qty}</td>
                    <td className="detail-table-ingredient-item">{ingredient.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
    </div>
  );
};

export default BatchDetails;
