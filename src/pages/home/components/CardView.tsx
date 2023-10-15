import CardWithInfo from "../../../components/card/CardWithInfo";
import { MangaDataList } from "../../../shared/interfaces/chapters";

interface Props {
  data: MangaDataList[];
}

function CardView({ data }: Props) {
  return (
    <div className="flex gap-4 space-between flex-wrap">
      {data.map((data) => {
        return (
          <CardWithInfo
            buttonVariant="primary-dark"
            name={data.Name}
            cover={data.CoverUrl}
            chapters={data.Chapters}
            width={275}
          />
        );
      })}
    </div>
  );
}

export default CardView;
