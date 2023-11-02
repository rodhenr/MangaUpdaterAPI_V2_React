import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useGetMangasQuery } from "../../api/queries/manga/MangaQueries";
import { queryClient } from "../../lib/query-client";

import { ICardData, IFilters } from "../../shared/interfaces/library";
import Card from "../../components/card/Card";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import AddMangaModal from "../../components/modal/AddMangaModal";
import SpinLoading from "../../components/loading/SpinLoading";
import Filters from "./components/Filters";

import "./Library.scss";
import Pagination from "./components/Pagination";

function Library() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [modalAddManga, setModalAddManga] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    orderById: "",
    sourceId: "",
    genreId: "",
  });

  const { data, error, isPending } = useGetMangasQuery(currentPage, filters);

  const handleFiltersChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    queryClient.invalidateQueries({ queryKey: ["libraryData"] });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangeAddMangaModal = () => {
    setModalAddManga((prev) => !prev);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    queryClient.invalidateQueries({ queryKey: ["libraryData"] });
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
        <Filters
          onChange={handleFiltersChange}
          filters={filters}
          genres={data?.data.genres ?? []}
        />
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
            <p className="fsize-4-5">
              Showing {data.data.mangas.length} results
            </p>
            <Button
              fontSize="fsize-3"
              onClick={() => handleChangeAddMangaModal()}
              text="Register new"
              width="100px"
              variant="bg-dark"
            />
          </div>
          <div className="library-main grid">
            {data.data.mangas.map((manga: ICardData) => {
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
          <Pagination
            currentPage={data.currentPage}
            onPageChange={handlePageChange}
            totalPages={data.totalPages}
          />
        </div>
      )}
      {modalAddManga &&
        createPortal(
          <AddMangaModal onClose={() => setModalAddManga(false)} />,
          document.body
        )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default Library;
