import { ChapterInfo } from "../../shared/interfaces/chapters";
import { formatDate } from "../../utils/date";
import Button from "../button/Button";
import "./CardWithInfo.scss";

interface Props {
  buttonVariant: "primary-light" | "primary-dark" | "success" | "danger";
  chapters: ChapterInfo[];
  cover: string;
  name: string;
  variant?: "primary-light" | "primary-dark" | "success" | "danger";
  width?: number;
}

function CardWithInfo({
  buttonVariant,
  chapters,
  cover,
  name,
  variant = "primary-light",
  width = 300,
}: Props) {
  return (
    <div
      className={`cardWithInfo-main flex-center gap-2 column roboto space-between radius-2 shadow-3 ${variant}`}
      style={{ width: width }}
    >
      <div className="h-100 w-100">
        <img src={cover} alt={`card for ${name}`} className="h-100 w-100" />
      </div>
      <div className="flex column flex-1 gap-4 p-2">
        <h1 className="fsize-5 text-center">{name}</h1>
        <div className="flex column flex-1 gap-2">
          {chapters.map((ch) => (
            <div className="flex gap-1 space-between align-center">
              <p className="fsize-3">{formatDate(ch.date)}</p>
              <p className="fsize-3">Chapter {ch.number.toString()}</p>
              <Button
                fontSize="fsize-3"
                height={20}
                onClick={() => null}
                text={ch.source}
                variant={buttonVariant}
              />
              <div
                className="round cursor-pointer"
                style={{
                  backgroundColor: ch.isRead ? "green" : "red",
                  height: 15,
                  width: 15,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardWithInfo;
