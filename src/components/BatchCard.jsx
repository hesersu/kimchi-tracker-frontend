import React, { useState } from "react";
import "../components/BatchCard.css";
import { Link } from "react-router";

const BatchCard = ({ batchData, handleDeleteBatch }) => {
  console.log(batchData);

  return (
    <div className="card-container">
      <div className="card-content">
        <section className="card-image">
          <img src={batchData.imageUrl} alt="One Kimchi" />
        </section>
        <section className="card-description">
          <h3>{batchData.name}</h3>
          <p>{batchData.createdAt}</p>
        </section>
      </div>
      <div className="card-controls">
        <Link to={`/details/${batchData.id}`}>
          <button>View Details</button>
        </Link>
        <button onClick={() => handleDeleteBatch(batchData.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BatchCard;
