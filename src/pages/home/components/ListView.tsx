import Button from "../../../components/button/Button";
import { MangaDataList } from "../../../shared/interfaces/chapters";
import { formatDate } from "../../../utils/date";

import "./ListView.scss";

interface Props {
  data: MangaDataList[];
}

function ListView({ data }: Props) {
  return (
    <div className="flex column space-between flex-wrap">
      <div className="header flex space-between border-secondary-light-1 pv-2 secondary-dark">
        <p className="flex-1 text-center">Manga</p>
        <p className="column-width text-center">Date</p>
        <p className="column-width text-center">Chapter</p>
        <p className="column-width text-center">Source</p>
        <p className="column-width text-center">Status</p>
      </div>
      {data.map((d, dataIndex) =>
        d.Chapters.map((chapter, chapterIndex) => {
          return (
            <div
              className={`flex align-center space-between pv-1 ${
                (dataIndex + chapterIndex) % 2 !== 0
                  ? "primary-light border-secondary-dark-1"
                  : "bg-light border-secondary-dark-left-1 border-secondary-dark-right-1"
              }`}
            >
              <p className="flex-1 text-center fsize-3 ph-1">{d.Name}</p>
              <p className="column-width text-center fsize-3">
                {formatDate(chapter.Date)}
              </p>
              <p className="column-width text-center fsize-3">
                Chapter {chapter.Number}
              </p>
              <p className="flex-center column-width text-center fsize-3">
                <Button
                  fontSize="fsize-3"
                  height="25px"
                  onClick={() => null}
                  text={chapter.SourceName}
                  variant="primary-dark"
                  width="100px"
                />
              </p>
              <div className="flex-center column-width text-center">
                <Button
                  fontSize="fsize-3"
                  height="25px"
                  onClick={() => null}
                  text={chapter.Read ? "Read" : "Not Read"}
                  variant={chapter.Read ? "success" : "danger"}
                  width="100px"
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListView;
