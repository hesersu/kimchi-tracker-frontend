import React from "react";

const NotFoundPage = () => {
  return (
    <main className="main-container">
      <div className="not-found-container">
        <h2>Oh, no! Page not found!</h2>
        <img
          src="../src/assets/sad-vegetables.png"
          alt="sad vegetables"
          className="not-found-img"
        />
      </div>
    </main>
  );
};

export default NotFoundPage;
