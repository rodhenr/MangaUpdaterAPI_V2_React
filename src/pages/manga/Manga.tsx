import { useParams } from "react-router-dom";

import { useGetMangaQuery } from "../../api/queries/manga/MangaQueries";

import SeeAlso from "./components/SeeAlso";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import SpinLoading from "../../components/loading/SpinLoading";

import "./Manga.scss";

function Manga() {
  const { mangaId } = useParams();
  const { data, error, isPending } = useGetMangaQuery(mangaId);

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
        <div className="top flex gap-4">
          <ContentLeft
            coverUrl={data.data.coverUrl}
            isUserFollowing={data.data.isUserFollowing}
            mangaId={data.data.mangaId}
            sources={data.data.sources}
            type={data.data.type}
          />
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
    </>
  ) : (
    <div>No data found</div>
  );
}

export default Manga;
