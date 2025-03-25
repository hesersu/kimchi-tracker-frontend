import React, { useEffect, useState } from "react";
import "../components/BatchNotes.css";
import { useParams } from "react-router";
import axios from "axios";

const BatchNotes = () => {
  const { batchId } = useParams();
  const [notes, setNotes] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/notes/?batchId=${batchId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [batchId]);

  console.log(notes);

  //   console.log(oneBatch);
  if (!notes) {
    return <div>Notes is not found!</div>;
  }

  return (
    <div>
      <h3>Here are my notes!</h3>
      <div>
        {notes.map((oneNote) => {
          return (
            <div className="notes-container">
              <section className="notes-image">
                <img src={oneNote.imageUrl} alt="" />
              </section>
              <section className="notes-description">
                <h4>{oneNote.date}</h4>
                <p>{oneNote.content}</p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatchNotes;
