import { v4 as uuidv4 } from "uuid";

import CardWithInfo from "../../../components/card/CardWithInfo";
import { MangaDataList } from "../../../shared/interfaces/chapters";

import "./CardView.scss";

interface Props {
  data: MangaDataList[];
}

function CardView({ data }: Props) {
  return (
    <div className="cardView-main grid gap-2">
      {data.map((data: MangaDataList) => {
        return (
          <CardWithInfo
            buttonVariant="primary-dark"
            chapters={data.chapters}
            cover={data.coverUrl}
            id={data.id}
            key={uuidv4()}
            name={data.name}
          />
        );
      })}
    </div>
  );
}

export default CardView;
