import "../components/BatchCard.css";
import { useNavigate } from "react-router";
import viewDetailIcon from "../assets/view-detail-icon.svg";
import deleteBatchIcon from "../assets/delete-icon.svg";

const BatchCard = ({ batchData, handleDeleteBatch }) => {
  // console.log(batchData);
  const navigate = useNavigate();
  function handleDetail(id){
    navigate(`/details/${id}`);
  }
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
        <button className="card-btn" onClick={()=>handleDetail(batchData.id)}>
          <img src={viewDetailIcon} alt="View details icon" className="card-icon"/>
          View Details
          </button>
        <button onClick={() => handleDeleteBatch(batchData.id)} className="card-btn btn-danger">
          <img src={deleteBatchIcon} alt="Delete batch icon" className="card-icon"/>
          Delete
          </button>
      </div>
    </article>
  );
};

export default BatchCard;
