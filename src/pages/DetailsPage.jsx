import React from "react";
import BatchDetails from "../components/BatchDetails";
import BatchNotes from "../components/BatchNotes";

const DetailsPage = () => {
  return (
    <main className="main-container">
      <div className="detail-page-container">
       <h2 className="detail-title">DetailsPage</h2>
        <BatchDetails />
        <BatchNotes />
      </div>
    </main>
    
  );
};

export default DetailsPage;
