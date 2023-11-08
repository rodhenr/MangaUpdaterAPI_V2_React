import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import CardWithInfo from "../../../components/card/CardWithInfo";
import { MangaDataList } from "../../../shared/interfaces/chapters";
import ThemeContext from "../../../shared/context/ThemeContext";

import "./CardView.scss";

interface Props {
  data: MangaDataList[];
}

function CardView({ data }: Props) {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="cardView-main grid">
      {data.map((data: MangaDataList) => {
        return (
          <CardWithInfo
            buttonVariant={
              themeMode === "light" ? "secondary-dark" : "secondary-light"
            }
            chapters={data.chapters}
            cover={data.coverUrl}
            id={data.id}
            key={uuidv4()}
            name={data.name}
            variant={themeMode === "light" ? "primary-light" : "bg-card-dark"}
          />
        );
      })}
    </div>
  );
}

export default CardView;
