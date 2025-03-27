import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../config/apiConfig";

export const CreateRecipePage = () => {
  const [batch, setBatch] = useState();
  const [note, setNote] = useState({
    batchId: null,
    userId: 1,
    date: "",
    imageUrl: "",
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
    // console.log("batch : ", batch);
    // console.log("note : ", note);
    try {
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
    <div>Batchh not found</div>
  ) : (
    <div>
      <div>CreateRecipePage</div>
      <form onSubmit={handleSubmit} className="container-flex-column-p-1">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={batch.name}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="date"
          name="createdAt"
          id="date"
          value={batch.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="https://...image-URL"
          value={batch.imageUrl}
          onChange={handleChange}
          autoComplete="off"
        />
        <textarea
          name="content"
          id="noteContent"
          placeholder="Write you first note about this recipe..."
          value={note.content}
          onChange={handleChange}
          autoComplete="off"
          rows="5"
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
