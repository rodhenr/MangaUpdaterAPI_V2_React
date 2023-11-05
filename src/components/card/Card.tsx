import { useNavigate } from "react-router-dom";

import { truncateString } from "../../utils/string";

import "./Card.scss";

interface Props {
  color: "text-primary" | "text-secondary" | "text-light";
  height?: string;
  id: number;
  imagePath: string;
  text: string;
  width?: string;
}

function Card({
  color,
  height = "300px",
  id,
  imagePath,
  text,
  width = "100%",
}: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/manga/${id}`);
  };

  return (
    <div
      className="card-main flex justify-start gap-4 column roboto space-between break-word border-box cursor-pointer"
      style={{ width: width }}
      onClick={handleNavigate}
    >
      <img
        src={imagePath}
        alt={`card for ${text}`}
        className="w-100 radius-2 shadow-3 object-cover"
        style={{ height: height, maxHeight: height }}
      />
      <p className={`flex-1 text-center fsize-4 roboto ${color}`}>
        {truncateString(text, 40)}
      </p>
    </div>
  );
}

export default Card;
