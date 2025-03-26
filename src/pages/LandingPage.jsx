import { useState, useEffect } from "react";
import BatchCard from "../components/BatchCard";
import axios from "axios";

export const LandingPage = () => {
  const [batches, setBatches] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/batches/?userId=${userId}`)
      .then((res) => setBatches(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  function handleDeleteBatch(id) {
    console.log("This is now deleting batches - first backend, then frontend");
    axios
      .delete(`http://localhost:5005/batches/${id}`)
      .then((res) => {
        console.log(res.data);
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
{batches.map((oneBatch) => (
          <BatchCard
            batchData={oneBatch}
            handleDeleteBatch={handleDeleteBatch}
          />
        ))}
      </div>
        
    </main>
  );
};
