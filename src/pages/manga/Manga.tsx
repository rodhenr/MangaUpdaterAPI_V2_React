import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetMangaQuery } from "../../api/queries/manga/MangaQueries";

import useGetWindowWidth from "../../hooks/useGetWindowWidth";

import SeeAlso from "./components/SeeAlso";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import SpinLoading from "../../components/loading/SpinLoading";

import "./Manga.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Manga() {
  const { mangaId } = useParams();
  const { data, error, isPending, refetch } = useGetMangaQuery(mangaId);
  const windowWidth = useGetWindowWidth();

  useEffect(() => {
    refetch();
  }, [refetch, mangaId]);

  if (error) return "error...";

  return isPending ? (
    <div className="flex-center column gap-4 h-100 w-100">
      <SpinLoading />
      <p className="fsize-5">Loading...</p>
    </div>
  ) : data ? (
    <>
      <div
        className="manga-main flex column gap-4 border-box relative"
        id="manga-page"
      >
        <div
          className={`top flex gap-4 ${windowWidth > 800 ? "row" : "column"}`}
        >
          <ContentLeft data={data.data} />
          <ContentRight
            alternativeName={data.data.alternativeName}
            artist={data.data.author}
            author={data.data.author}
            chapters={data.data.chapters}
            genres={data.data.genres}
            mangaId={data.data.mangaId}
            name={data.data.name}
            synopsis={data.data.synopsis}
          />
        </div>
        <SeeAlso data={data.highlightedMangas} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ) : (
    <div>No data found</div>
  );
}

export default Manga;
