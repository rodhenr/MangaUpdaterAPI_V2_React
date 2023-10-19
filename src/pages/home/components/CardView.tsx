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
      {data.map((data) => {
        return (
          <CardWithInfo
            key={uuidv4()}
            buttonVariant="primary-dark"
            name={data.name}
            cover={data.coverUrl}
            chapters={data.chapters}
          />
        );
      })}
    </div>
  );
}

export default CardView;
