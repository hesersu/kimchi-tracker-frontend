import React from "react";
import { useParams } from "react-router";

const BatchDetails = () => {
  const { batchId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/batches/?userId=${userId}`)
      .then((res) => setBatches(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      BatchDetails
      <div>These are the Batch Detail</div>
    </div>
  );
};

export default BatchDetails;
