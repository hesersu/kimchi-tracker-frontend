import { useState, useEffect } from "react";
import BatchCard from "../components/BatchCard";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";

export const LandingPage = ({showToast}) => {
  const [batches, setBatches] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_URL}/batches/?userId=${userId}`)
      .then((res) => setBatches(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  function handleDeleteBatch(id) {
    console.log("This is now deleting batches - first backend, then frontend");
    axios
      .delete(`${API_URL}/batches/${id}`)
      .then((res) => {
        res.status == 200 ? showToast("Batch deleted.", "success") : showToast(res.statusText, "danger")
        const filteredBatches = batches.filter(
          (oneElement) => oneElement.id !== id
        );
        setBatches(filteredBatches);
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="main-container">
      <div className="card-list-container">
        {batches
          .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((oneBatch) => (
            <BatchCard
              batchData={oneBatch}
              handleDeleteBatch={handleDeleteBatch}
            />
          ))}
      </div>
    </main>
  );
};
