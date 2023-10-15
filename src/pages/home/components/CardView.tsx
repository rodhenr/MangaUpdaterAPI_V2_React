import CardWithInfo from "../../../components/card/CardWithInfo";
import { MangaDataList } from "../../../shared/interfaces/chapters";

interface Props {
  data: MangaDataList[];
}

function CardView({ data }: Props) {
  return (
    <div className="cardView-main flex space-between flex-wrap row-gap-3">
      {data.map((data) => {
        return (
          <CardWithInfo
            buttonVariant="primary-dark"
            name={data.Name}
            cover={data.CoverUrl}
            chapters={data.Chapters}
          />
        );
      })}
    </div>
  );
}

export default CardView;
