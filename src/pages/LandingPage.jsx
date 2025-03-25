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
  }, []);

  return (
    <div>
      Hello World!
      <div>
        {batches.map((oneBatch) => (
          <BatchCard batchData={oneBatch} />
        ))}
      </div>
    </div>
  );
};
