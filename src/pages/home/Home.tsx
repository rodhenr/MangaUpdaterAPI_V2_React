import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetHomeMangasQuery } from "../../api/queries/manga/MangaQueries";

import AuthContext from "../../shared/context/AuthContext";
import ThemeContext from "../../shared/context/ThemeContext";

import PageHeader from "../../components/pageHeader/PageHeader";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import SpinLoading from "../../components/loading/SpinLoading";

function Home() {
  const { themeMode } = useContext(ThemeContext);
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const { userInfo } = useContext(AuthContext);
  const { data, error, isPending } = useGetHomeMangasQuery();

  const notLogged = (
    <div className="flex-center column gap-2 mt-6">
      <p className="fsize-6">Login to start following mangas</p>
    </div>
  );

  const pageHeader = (
    <div className="w-100">
      <PageHeader>
        <div className="flex space-between w-100 align-end">
          <p className="fsize-5">Updates</p>
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon="bars"
              className={`fsize-5 ${
                isCardView
                  ? "text-disabled"
                  : themeMode === "light"
                  ? "cursor-pointer text-secondary-dark"
                  : "cursor-pointer text-secondary-light"
              }`}
              onClick={() => setIsCardView(true)}
            />
            <FontAwesomeIcon
              icon="list"
              className={`fsize-5 ${
                isCardView
                  ? themeMode === "light"
                    ? "cursor-pointer text-secondary-dark"
                    : "cursor-pointer text-secondary-light"
                  : "text-disabled"
              }`}
              onClick={() => setIsCardView(false)}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );

  if (error) return "error...";

  return (
    <div className="flex column gap-4 h-100 w-100">
      {pageHeader}
      {!userInfo.token ? (
        <>{notLogged}</>
      ) : isPending ? (
        <div className="flex-center column gap-4 h-100 w-100">
          <SpinLoading />
          <p className="fsize-5">Loading...</p>
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            isCardView ? (
              <CardView data={data} />
            ) : (
              <ListView data={data} />
            )
          ) : (
            <div>You are not following any manga</div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
