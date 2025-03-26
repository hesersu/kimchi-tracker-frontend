import "../components/BatchCard.css";
import { Link } from "react-router";

const BatchCard = ({ batchData, handleDeleteBatch }) => {
  // console.log(batchData);

  return (
    <article className="card-container">
      <div className="card-content">
        <section className="card-image-container">
          <img
            src={batchData.imageUrl}
            alt="One Kimchi"
            className="card-image"
          />
        </section>
        <section className="card-description">
          <h3 className="card-description-title">{batchData.name}</h3>
          <p>{batchData.createdAt}</p>
        </section>
      </div>
      <div className="card-controls">
        <Link to={`/details/${batchData.id}`}>
          <button className="card-btn">View Details</button>
        </Link>
        <button
          onClick={() => handleDeleteBatch(batchData.id)}
          className="card-btn btn-danger"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default BatchCard;
