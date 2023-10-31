import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import { useGetMangasQuery } from "../../api/queries/manga/MangaQueries";

import { ICardData } from "../../shared/interfaces/library";
import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import SelectGroup from "../../components/select/SelectGroupt";
import AddMangaModal from "../../components/modal/AddMangaModal";
import SpinLoading from "../../components/loading/SpinLoading";

import "./Library.scss";

interface IState {
  orderById: string;
  sourceId: string;
  genreId: string;
}

function Library() {
  const [search, setSearch] = useState<string>("");
  const [modalAddManga, setModalAddManga] = useState<boolean>(false);
  const [filters, setFilters] = useState<IState>({
    orderById: "",
    sourceId: "",
    genreId: "",
  });
  const { data, error, isPending } = useGetMangasQuery();

  const handleFiltersChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFilters((prev) => {
      const filtersCopy = { ...prev };
      filtersCopy[name as keyof IState] = value;

      return filtersCopy;
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangeAddMangaModal = () => {
    setModalAddManga((prev) => !prev);
  };

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
            onChange={handleFiltersChange}
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
            value={filters.orderById}
          />
          <SelectGroup
            onChange={handleFiltersChange}
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
            value={filters.sourceId}
          />
          <SelectGroup
            onChange={handleFiltersChange}
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
            value={filters.genreId}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {pageHeader}
      {isPending ? (
        <div className="flex-center column gap-4 h-100 w-100">
          <SpinLoading />
          <p className="fsize-5">Loading...</p>
        </div>
      ) : (
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
      )}
      {modalAddManga &&
        createPortal(
          <AddMangaModal onClose={() => setModalAddManga(false)} />,
          document.body
        )}
    </div>
  );
}

export default Library;
