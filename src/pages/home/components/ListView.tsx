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
      <div className="header flex space-between border-1 pv-2 primary-dark">
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
                  ? "primary-light border-1"
                  : "bg-light border-left-1 border-right-1"
              }`}
            >
              <p className="flex-1  text-center fsize-3">{d.Name}</p>
              <p className="column-width text-center fsize-3">
                {formatDate(chapter.Date)}
              </p>
              <p className="column-width text-center fsize-3">
                Chapter {chapter.Number}
              </p>
              <p className="flex-center column-width text-center fsize-3">
                <Button
                  onClick={() => null}
                  text={chapter.SourceName}
                  variant="bg-dark"
                  height={25}
                  width={80}
                  fontSize="fsize-3"
                />
              </p>
              <div className="flex-center column-width text-center">
                <Button
                  onClick={() => null}
                  text={chapter.Read ? "Read" : "Not Read"}
                  variant={chapter.Read ? "success" : "danger"}
                  height={25}
                  width={80}
                  fontSize="fsize-3"
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
