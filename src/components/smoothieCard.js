import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <p className="rating">{smoothie.rating}</p>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;
