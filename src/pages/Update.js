import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
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
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      setFetchError("Could not update the smoothie");
      console.log(error);
      return;
    }
    if (data) {
      setFetchError(null);
      console.log("Smoothie updated:", data);
      setTitle("");
      setMethod("");
      setRating(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update create">
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
        <button>Update the Smoothie</button>
        {fetchError && <p>{fetchError}</p>}
      </form>
    </div>
  );
};

export default Update;
