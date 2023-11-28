import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Button from "../button/Button";
import { ChapterInfo } from "../../shared/interfaces/chapters";
import { Variant } from "../../shared/interfaces/components";
import { formatDate } from "../../utils/date";
import { truncateString } from "../../utils/string";

import "./CardWithInfo.scss";

interface Props {
  buttonVariant: Variant;
  chapters: ChapterInfo[];
  cover: string;
  id: number;
  name: string;
  variant?: Variant;
}

function CardWithInfo({
  buttonVariant,
  chapters,
  cover,
  id,
  name,
  variant = "primary-light",
}: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/manga/${id}`);
  };

  return (
    <div
      className={`cardWithInfo-main flex-center gap-2 column roboto space-between radius-2 shadow-3 ${variant} border-box`}
    >
      <div className="w-100">
        <img
          src={cover}
          alt={`card for ${name}`}
          className="h-100 w-100 object-cover"
        />
      </div>
      <div className="border-box flex column flex-1 gap-4 p-2 w-100">
        <div
          className="flex-center text-center cursor-pointer"
          style={{ height: 35 }}
          onClick={handleNavigate}
        >
          <h1 className="text-light">{truncateString(name, 48)}</h1>
        </div>
        <div className="flex column flex-1 gap-2" style={{ minHeight: 80 }}>
          {chapters.map((ch) => (
            <div key={uuidv4()} className="flex gap-1">
              <div className="flex-center flex-1 ">
                <p className="fsize-3">{formatDate(ch.date)}</p>
                <p className="fsize-3 text-center flex-1">
                  Chapter {ch.number.toString()}
                </p>
              </div>
              <div className="flex-center gap-2">
                <Button
                  fontSize="fsize-3"
                  height="20px"
                  text={ch.sourceName}
                  variant={buttonVariant}
                  width="fit-content"
                />
                <div
                  className="round border-box"
                  style={{
                    backgroundColor: ch.read ? "green" : "red",
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
