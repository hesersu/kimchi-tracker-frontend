import "../components/BatchCard.css";
import { useNavigate } from "react-router";
// import viewDetailIcon from "../assets/view-detail-icon.svg";
// import deleteBatchIcon from "../assets/delete-icon.svg";
import defaultKimchi from "../assets/kimchi-default.png";

const BatchCard = ({ batchData, handleDeleteBatch }) => {
  // console.log(batchData);
  const defaultImage = defaultKimchi;
  const navigate = useNavigate();
  function handleDetail(id){
    navigate(`/details/${id}`);
  }
  return (
    <article className="card-container">
      <div className="card-content">
        <section className="card-image-container">
          <img
            src={batchData.imageUrl ? batchData.imageUrl : defaultImage}
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
          {/* <img src={viewDetailIcon} alt="View details icon" className="card-icon"/> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
          View Details
          </button>
        <button onClick={() => handleDeleteBatch(batchData.id)} className="card-btn btn-danger">
          {/* <img src={deleteBatchIcon} alt="Delete batch icon" className="card-icon"/> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          Delete
          </button>
      </div>
    </article>
  );
};

export default BatchCard;
