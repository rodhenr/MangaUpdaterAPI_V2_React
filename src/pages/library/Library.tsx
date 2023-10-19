import { useContext, useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { axios } from "../../lib/axios";
import AuthContext from "../../shared/context/AuthContext";
import { IDefaultUserInfo } from "../../shared/interfaces/auth";
import useReadFromLocalStorage, {
  StorageValue,
} from "../../hooks/useReadFromLocalStorage";
import Card from "../../components/card/Card";
import { ICardData } from "../../shared/interfaces/library";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";

import "./Library.scss";
import Input from "../../components/input/Input";

function Library() {
  const [search, setSearch] = useState<string>("");
  const authContext = useContext(AuthContext);
  const userInfo: StorageValue<IDefaultUserInfo> =
    useReadFromLocalStorage("userInfo");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["libraryData"],
    queryFn: () =>
      axios
        .get("http://localhost:5030/api/manga", {
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

  if (isPending) return "Loading...";

  if (error) return "error...";

  const pageHeader = (
    <div className="w-10 flex column gap-2">
      <PageHeader>
        <p className="fsize-5">Library</p>
      </PageHeader>
      <div>
        <Input
          placeholder="Search for a manga"
          type="search"
          iconSide="left"
          id={"searchManga"}
          icon="search"
          width="350px"
          value={search}
          onChange={handleSearch}
          variant="bg-dark"
        />
      </div>
    </div>
  );

  return (
    <div>
      {pageHeader}
      <div className="flex column content roboto mt-5 gap-4">
        <div className="flex space-between">
          <p className="fsize-4-5">Showing {data.length} results</p>
          <Button
            text="Register new"
            fontSize="fsize-3"
            width="100px"
            variant="bg-dark"
          />
        </div>
        <div className="library-main grid">
          {data.map((manga: ICardData) => {
            return (
              <Card
                color="text-primary"
                id={manga.mangaId}
                imagePath={manga.coverUrl}
                key={uuidv4()}
                text={manga.mangaName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Library;
