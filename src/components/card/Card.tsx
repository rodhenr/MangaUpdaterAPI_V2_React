import "./Card.scss";

interface Props {
  color: "text-primary" | "text-secondary";
  imagePath: string;
  text: string;
  width?: number;
}

function Card({ color, imagePath, text, width = 170 }: Props) {
  return (
    <div
      className="card-main flex-center gap-2 column roboto space-between "
      style={{ width: width }}
    >
      <img
        src={imagePath}
        alt={`card for ${text}`}
        className="flex-1 w-100 radius-2 shadow-3"
      />
      <p className={`text-center ${color}`}>{text}</p>
    </div>
  );
}

export default Card;
