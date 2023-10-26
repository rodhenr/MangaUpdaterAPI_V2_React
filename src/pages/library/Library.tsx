import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import AxiosClient from "../../lib/axios";

import { ICardData } from "../../shared/interfaces/library";
import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import SelectGroup from "../../components/select/SelectGroupt";
import AddMangaModal from "../../components/modal/AddMangaModal";

import "./Library.scss";

function Library() {
  const [search, setSearch] = useState<string>("");
  const [orderById, setOrderById] = useState<string>("");
  const [sourceId, setSourceId] = useState<string>("");
  const [genreId, setGenreId] = useState<string>("");
  const [modalAddManga, setModalAddManga] = useState<boolean>(false);
  const axios = AxiosClient();

  const handleOrderByIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderById(event.target.value);
  };

  const handleSourceChangIde = (event: ChangeEvent<HTMLSelectElement>) => {
    setSourceId(event.target.value);
  };

  const handleGenreChangIde = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenreId(event.target.value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["libraryData"],
    queryFn: () => axios.get<ICardData[]>("/api/manga").then((res) => res.data),
  });

  const handleChangeAddMangaModal = () => {
    setModalAddManga((prev) => !prev);
  };

  if (isPending) return "Loading...";

  if (error) return "error...";

  const pageHeader = (
    <div className="w-10 flex column gap-2">
      <PageHeader>
        <p className="fsize-5">Library</p>
      </PageHeader>
      <div className="flex space-between">
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
        <div className="flex gap-3">
          <SelectGroup
            onChange={handleOrderByIdChange}
            placeholder="Order By"
            options={[
              {
                description: "Order By",
                value: "0",
                isHidden: true,
              },
              {
                description: "A-Z",
                value: "1",
                isHidden: false,
              },
              {
                description: "Latest",
                value: "2",
                isHidden: false,
              },
            ]}
            value={orderById}
          />
          <SelectGroup
            onChange={handleSourceChangIde}
            placeholder="Source"
            options={[
              {
                description: "Source",
                value: "0",
                isHidden: true,
              },
              {
                description: "MangaLivre",
                value: "1",
                isHidden: false,
              },
              {
                description: "AsuraScans",
                value: "2",
                isHidden: false,
              },
            ]}
            value={sourceId}
          />
          <SelectGroup
            onChange={handleGenreChangIde}
            placeholder="Genre"
            options={[
              {
                description: "Genre",
                value: "0",
                isHidden: true,
              },
              {
                description: "Comedy",
                value: "1",
                isHidden: false,
              },
              {
                description: "Adventure",
                value: "2",
                isHidden: false,
              },
            ]}
            value={genreId}
          />
        </div>
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
            fontSize="fsize-3"
            onClick={() => handleChangeAddMangaModal()}
            text="Register new"
            width="100px"
            variant="bg-dark"
          />
        </div>
        <div className="library-main grid">
          {data.map((manga: ICardData) => {
            return (
              <Card
                key={uuidv4()}
                color="text-primary"
                id={manga.mangaId}
                imagePath={manga.coverUrl}
                text={manga.mangaName}
              />
            );
          })}
        </div>
      </div>
      {modalAddManga &&
        createPortal(
          <AddMangaModal onClose={() => setModalAddManga(false)} />,
          document.body
        )}
    </div>
  );
}

export default Library;
