import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ThemeContext from "../../../shared/context/ThemeContext";

import useGetWindowWidth from "../../../hooks/useGetWindowWidth";

import Button from "../../../components/button/Button";
import { MangaDataList } from "../../../shared/interfaces/chapters";
import { formatDate } from "../../../utils/date";

import "./ListView.scss";

interface Props {
  data: MangaDataList[][];
}

function ListView({ data }: Props) {
  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const windowWidth = useGetWindowWidth();

  const handleNavigate = (id: number) => {
    navigate(`/manga/${id}`);
  };

  return (
    <div className="flex column space-between flex-wrap">
      <div
        className={`header flex space-between pv-2 ${
          themeMode === "light"
            ? "border-secondary-dark-1 secondary-dark"
            : "border-secondary-light-1 bg-menu-dark text-secondary-light"
        }`}
      >
        <p className="flex-1 text-center">Manga</p>
        <p className="column-width text-center">Date</p>
        <p className="column-width text-center">Chapter</p>
        <p className="column-width text-center">Source</p>
        <p className="column-width text-center">Status</p>
      </div>
      {data.map((page: MangaDataList[], dataIndex: number) => (
        <div>
          {page.map((p: MangaDataList) =>
            p.chapters.map((chapter, chapterIndex) => {
              return (
                <div
                  key={uuidv4()}
                  className={`flex align-center space-between pv-2 ${
                    (dataIndex + chapterIndex) % 2 !== 0
                      ? themeMode === "light"
                        ? "primary-light border-secondary-dark-left-1 border-secondary-dark-right-1"
                        : "bg-menu-dark bg-dark border-secondary-light-left-1 border-secondary-light-right-1 border-bottom-light"
                      : themeMode === "light"
                      ? "bg-light border-secondary-dark-left-1 border-secondary-dark-right-1 border-bottom-primary-light"
                      : "bg-dark border-secondary-light-left-1 border-secondary-light-right-1 border-bottom-light"
                  }`}
                >
                  <div className="flex-1 text-center ph-1 ">
                    <span
                      className="fsize-3 cursor-pointer"
                      onClick={() => handleNavigate(p.id)}
                    >
                      {p.name}
                    </span>
                  </div>
                  <p className="column-width text-center fsize-3">
                    {formatDate(chapter.date)}
                  </p>
                  <p className="column-width text-center fsize-3">
                    Chapter {chapter.number}
                  </p>
                  <div className="flex-center column-width text-center fsize-3">
                    <Button
                      fontSize="fsize-3"
                      height={windowWidth > 900 ? "20px" : "30px"}
                      mouseover={false}
                      onClick={() => null}
                      text={chapter.sourceName}
                      variant={
                        themeMode === "light"
                          ? "secondary-dark"
                          : "primary-light"
                      }
                      width={windowWidth > 900 ? "100px" : "50px"}
                    />
                  </div>
                  <div className="flex-center column-width text-center">
                    <Button
                      fontSize="fsize-3"
                      height={windowWidth > 900 ? "20px" : "30px"}
                      mouseover={false}
                      onClick={() => null}
                      text={chapter.read ? "Read" : "Not Read"}
                      variant={chapter.read ? "success" : "danger"}
                      width={windowWidth > 900 ? "100px" : "50px"}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}

export default ListView;
