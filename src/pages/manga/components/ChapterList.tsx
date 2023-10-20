import { v4 as uuidv4 } from "uuid";

import { IMangaChapter } from "../../../shared/interfaces/manga";

interface Props {
  chapters: IMangaChapter[];
}

function ChapterList({ chapters }: Props) {
  return (
    <div>
      <h1>Updates</h1>
      <div>
        {chapters &&
          chapters.map((chapter) => {
            return (
              <div key={uuidv4()} className="flex gap-4">
                <p>{chapter.date}</p>
                <p>{chapter.number}</p>
                <p>{chapter.sourceName}</p>
                <p>{chapter.read ? "Read" : "Not Read"}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChapterList;
