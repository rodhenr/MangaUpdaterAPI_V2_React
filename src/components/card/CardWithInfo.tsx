import { ChapterInfo } from "../../shared/interfaces/chapters";
import { formatDate } from "../../utils/date";
import { truncateString } from "../../utils/string";
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
      <div className="w-100">
        <img src={cover} alt={`card for ${name}`} className="h-100 w-100" />
      </div>
      <div className="border-box flex column flex-1 gap-4 p-2 w-100">
        <div className="flex-center text-center" style={{ height: 35 }}>
          <h1>{truncateString(name, 48)}</h1>
        </div>
        <div className="flex column flex-1 gap-2 w-100">
          {chapters.map((ch) => (
            <div className="flex gap-2 space-between align-center w-100">
              <div className="flex-center flex-1 space-between">
                <p className="fsize-3">{formatDate(ch.Date)}</p>
                <p style={{ fontSize: 14 }}>Chapter {ch.Number.toString()}</p>
              </div>
              <div className="flex-center gap-2">
                <Button
                  fontSize="fsize-3"
                  height={20}
                  onClick={() => null}
                  text={ch.SourceName}
                  variant={buttonVariant}
                />
                <div
                  className="round cursor-pointer"
                  style={{
                    backgroundColor: ch.Read ? "green" : "red",
                    border: "1px solid #FFF",
                    height: 15,
                    width: 15,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardWithInfo;
