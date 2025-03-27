import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../config/apiConfig";
import sadVegetable from "../assets/sad-vegetables.png";

export const CreateRecipePage = () => {
  const [batch, setBatch] = useState();
  const [note, setNote] = useState({
    batchId: null,
    userId: 1,
    date: "",
    imageUrl: "https://pikaso.cdnpk.net/private/production/1707907598/upload.jpeg?token=exp=1748563200~hmac=ac961820da3b4156e97ae6a83b4a8873abf8c885bdc34fe61a05a8c237ffd800&preview=1",
    content: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/batches/${id}`)
      .then((res) => setBatch(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name == "name" || name == "imageUrl") {
      setBatch({ ...batch, [name]: value });
    }
    if (name === "content" || name == "imageUrl") {
      setNote({ ...note, batchId: batch.id, [name]: value });
    }
    if (name === "createdAt") {
      setBatch({ ...batch, [name]: value });
      setNote({ ...note, date: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("On submit...");
    if(!batch.imageUrl || batch.imageUrl.length <=0){
      setBatch({ ...batch, ["imageUrl"]: "https://pikaso.cdnpk.net/private/production/1707907598/upload.jpeg?token=exp=1748563200~hmac=ac961820da3b4156e97ae6a83b4a8873abf8c885bdc34fe61a05a8c237ffd800&preview=1" });
    }
    // console.log("batch : ", batch);
    // console.log("note : ", note);
    try {
      console.log("batch to be register : ", batch);
      const res_batch = await axios.patch(`${API_URL}/batches/${id}`, batch);
      console.log("Batch created", res_batch.data);
      if (note.content !== "") {
        const res_note = await axios.post(`${API_URL}/notes`, note);
        console.log("Note created", res_note.data);
      }
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  }

  return !batch ? (
    <div>
      <h2>Batchh not found</h2>
      <img src={sadVegetable} alt="sad vegetable" />
    </div>
  ) : (
    <main className="main-container">
      <div className="create-recipe-container">
        <div className="create-recipe-title">Name your Kimchi batch!</div>
        <form onSubmit={handleSubmit} className="create-recipe-form bg-yellow">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={batch.name}
            onChange={handleChange}
            autoComplete="off"
            className="create-recipe-input"
          />
          <input
            type="date"
            name="createdAt"
            id="date"
            value={batch.date}
            onChange={handleChange}
            className="create-recipe-input"
          />
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="https://...image-URL"
            value={batch.imageUrl}
            onChange={handleChange}
            autoComplete="off"
            className="create-recipe-input"
          />
          <textarea
            name="content"
            id="noteContent"
            placeholder="Write you first note about this recipe..."
            value={note.content}
            onChange={handleChange}
            autoComplete="off"
            rows="5"
            className="create-recipe-textarea"
          ></textarea>
          <div className="continue-btn-container">
            <button type="submit" className="continue-btn">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
};
