import React from "react";
import BatchDetails from "../components/BatchDetails";
import BatchNotes from "../components/BatchNotes";

const DetailsPage = ({showToast}) => {
  return (
    <main className="main-container">
      <div className="detail-page-container">
       <h2 className="detail-title">Details of your recipe</h2>
        <BatchDetails />
        <BatchNotes showToast={showToast}/>
      </div>
    </main>
    
  );
};

export default DetailsPage;
