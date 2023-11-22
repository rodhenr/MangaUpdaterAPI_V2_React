import { Fragment } from "react";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import CardWithInfo from "../../../components/card/CardWithInfo";
import { MangaDataList } from "../../../shared/interfaces/chapters";
import ThemeContext from "../../../shared/context/ThemeContext";

import "./CardView.scss";

interface Props {
  data: MangaDataList[][];
}

function CardView({ data }: Props) {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="cardView-main grid">
      {data.map((page: MangaDataList[]) => (
        <Fragment key={uuidv4()}>
          {page.map((p: MangaDataList) => {
            return (
              <CardWithInfo
                buttonVariant={
                  themeMode === "light" ? "secondary-dark" : "secondary-light"
                }
                chapters={p.chapters}
                cover={p.coverUrl}
                id={p.id}
                key={uuidv4()}
                name={p.name}
                variant={
                  themeMode === "light" ? "primary-light" : "bg-card-dark"
                }
              />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

export default CardView;
