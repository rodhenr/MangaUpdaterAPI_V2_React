import { v4 as uuidv4 } from "uuid";

import Card from "../../../components/card/Card";
import { ICardData } from "../../../shared/interfaces/library";

interface Props {
  data: ICardData[];
}

function SeeAlso({ data }: Props) {
  return (
    <div className="flex column gap-2">
      <h3>See also</h3>
      <div className="flex gap-2">
        {data.map((manga) => (
          <Card
            color="text-primary"
            id={manga.mangaId}
            imagePath={manga.coverUrl}
            key={uuidv4()}
            text={manga.mangaName}
          />
        ))}
      </div>
    </div>
  );
}

export default SeeAlso;
