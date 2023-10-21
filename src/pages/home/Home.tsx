import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { axios } from "../../lib/axios";
import PageHeader from "../../components/pageHeader/PageHeader";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import AuthContext from "../../shared/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useReadFromLocalStorage, {
  StorageValue,
} from "../../hooks/useReadFromLocalStorage";
import { IDefaultUserInfo } from "../../shared/interfaces/auth";

function Home() {
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  const userInfo: StorageValue<IDefaultUserInfo> =
    useReadFromLocalStorage("userInfo");

  const { isPending, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () =>
      axios
        .get("/api/user/mangas", {
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
    enabled: userInfo?.token !== null && userInfo?.token !== "",
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
      {!authContext.userInfo.token ? (
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
