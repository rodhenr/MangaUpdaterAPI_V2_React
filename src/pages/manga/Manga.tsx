import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AxiosClient from "../../lib/axios";

import { IMangaData } from "../../shared/interfaces/manga";
import SeeAlso from "./components/SeeAlso";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";

import "./Manga.scss";

function Manga() {
  const { mangaId } = useParams();
  const axios = AxiosClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["mangaData"],
    queryFn: () =>
      axios.get<IMangaData>(`/api/manga/${mangaId}`).then((res) => res.data),
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
