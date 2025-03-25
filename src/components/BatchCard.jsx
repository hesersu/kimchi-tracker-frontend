import React, { useState } from "react";
import "../components/BatchCard.css";
import { Link } from "react-router";

const BatchCard = ({ batchData }) => {
  console.log(batchData);

  return (
    <div className="card-body">
      <div className="card-content">
        <section className="card-image">
          <img
            src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2023-11-how-to-make-kimchi%2Fhow-to-make-kimchi-259"
            alt="One Kimchi"
          />
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
        <button>Delete</button>
      </div>
    </div>
  );
};

export default BatchCard;
