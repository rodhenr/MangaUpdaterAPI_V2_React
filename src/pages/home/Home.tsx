import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AxiosClient from "../../lib/axios";

import { MangaDataList } from "../../shared/interfaces/chapters";
import AuthContext from "../../shared/context/AuthContext";
import PageHeader from "../../components/pageHeader/PageHeader";
import ListView from "./components/ListView";
import CardView from "./components/CardView";

function Home() {
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const { userInfo } = useContext(AuthContext);
  const axios = AxiosClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () =>
      axios.get<MangaDataList[]>("/api/user/mangas").then((res) => res.data),
    enabled: !!userInfo?.token,
  });

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
                  : "cursor-pointer text-secondary-dark"
              }`}
              onClick={() => setIsCardView(true)}
            />
            <FontAwesomeIcon
              icon="list"
              className={`fsize-5 ${
                isCardView
                  ? "cursor-pointer text-secondary-dark"
                  : "text-disabled"
              }`}
              onClick={() => setIsCardView(false)}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );

  if (isPending && userInfo?.token !== null && userInfo?.token !== "")
    return "Loading...";

  if (error) return "error...";

  return (
    <div className="flex column gap-4 h-100 w-100">
      {pageHeader}
      {!userInfo.token ? (
        <>{notLogged}</>
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
