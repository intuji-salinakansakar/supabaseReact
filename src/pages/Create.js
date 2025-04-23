import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFetchError("Please fill out all fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      setFetchError("Could not add the smoothie");
      console.log(error);
    }
    if (data) {
      setFetchError(null);
      console.log("Smoothie added:", data);
      setTitle("");
      setMethod("");
      setRating(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Smoothie Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="method">Smoothie Method:</label>
        <textarea
          onChange={(e) => setMethod(e.target.value)}
          id="method"
          value={method}
        ></textarea>
        <label htmlFor="rating">Smoothie Rating:</label>
        <input
          type="number"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />
        <button>Create new Smoothie</button>
        {fetchError && <p>{fetchError}</p>}
      </form>
    </div>
  );
};

export default Create;
