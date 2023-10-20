import { v4 as uuidv4 } from "uuid";

import { IMangaSource } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";

interface Props {
  sources: IMangaSource[];
}

function Sources({ sources }: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {sources &&
        sources.map((source) => {
          return (
            <Button
              fontSize="fsize-3"
              height="20px"
              key={uuidv4()}
              text={source.name}
              width="fit-content"
              variant="bg-dark"
            />
          );
        })}
    </div>
  );
}

export default Sources;
