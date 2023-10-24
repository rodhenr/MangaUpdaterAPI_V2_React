import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";
import AuthContext from "../../shared/context/AuthContext";
import useReadFromLocalStorage, {
  StorageValue,
} from "../../hooks/useReadFromLocalStorage";
import { IDefaultUserInfo } from "../../shared/interfaces/auth";
import { IMangaData } from "../../shared/interfaces/manga";
import SeeAlso from "./components/SeeAlso";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";

import "./Manga.scss";

function Manga() {
  const authContext = useContext(AuthContext);
  const userInfo: StorageValue<IDefaultUserInfo> =
    useReadFromLocalStorage("userInfo");

  const { mangaId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["mangaData"],
    queryFn: () =>
      axios
        .get<IMangaData>(`/api/manga/${mangaId}`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        })
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status === 401) {
            authContext.logout();
          } else {
            console.log(error.response);
          }
        }),
  });

  if (isPending) return "Loading...";

  if (error) return "error...";

  return data ? (
    <div
      className="manga-main flex column gap-4 border-box relative"
      id="manga-page"
    >
      <div className="top flex gap-4">
        <ContentLeft
          coverUrl={data.coverUrl}
          isUserFollowing={data.isUserFollowing}
          mangaId={data.mangaId}
          sources={data.sources}
          type={data.type}
        />
        <ContentRight
          alternativeName={data.alternativeName}
          artist={data.author}
          author={data.author}
          chapters={data.chapters}
          genres={data.genres}
          mangaId={data.mangaId}
          name={data.name}
          synopsis={data.synopsis}
        />
      </div>
      <SeeAlso />
    </div>
  ) : (
    <div>No data...</div>
  );
}

export default Manga;
