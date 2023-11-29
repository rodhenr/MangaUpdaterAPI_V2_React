import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import { useGetMangasQuery } from "../../api/queries/manga/MangaQueries";
import { queryClient } from "../../lib/query-client";

import AuthContext from "../../shared/context/AuthContext";
import ThemeContext from "../../shared/context/ThemeContext";

import { ICardData, IFilters } from "../../shared/interfaces/library";

import useGetWindowWidth from "../../hooks/useGetWindowWidth";

import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/input/Input";
import SpinLoading from "../../components/loading/SpinLoading";
import AddMangaModal from "../../components/modal/AddMangaModal";
import AddMangaSourceModal from "../../components/modal/AddMangaSourceModal";
import PageHeader from "../../components/pageHeader/PageHeader";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

import "./Library.scss";

function Library() {
  const { themeMode } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [modalAddManga, setModalAddManga] = useState<boolean>(false);
  const [modalAddMangaSource, setModalAddMangaSource] =
    useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    orderById: "",
    sourceId: "",
    genreId: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const windowWidth = useGetWindowWidth();

  const { data, error, isPending } = useGetMangasQuery(currentPage, {
    ...filters,
    input: debouncedSearch,
  });

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 750);

    return () => clearTimeout(delayTimer);
  }, [search]);

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

  const handleChangeAddMangaSourceModal = () => {
    setModalAddMangaSource((prev) => !prev);
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
      <div
        className={`flex space-between ${
          windowWidth < 900 && "column gap-2"
        } w-100`}
      >
        <Input
          placeholder="Search for a manga"
          type="search"
          iconSide="left"
          id={"searchManga"}
          icon="search"
          width={windowWidth > 900 ? "350px" : "auto"}
          value={search}
          onChange={handleSearch}
          variant={themeMode === "light" ? "primary-light" : "bg-light"}
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
            {authContext.userInfo.isAdmin && (
              <div className="flex gap-2">
                <Button
                  fontSize="fsize-3"
                  onClick={() => handleChangeAddMangaModal()}
                  text="Register Manga"
                  width="fit-content"
                  useHover={true}
                  variant={
                    themeMode === "light" ? "primary-light" : "secondary-light"
                  }
                />
                <Button
                  fontSize="fsize-3"
                  onClick={() => handleChangeAddMangaSourceModal()}
                  text="Register Source"
                  width="fit-content"
                  useHover={true}
                  variant={
                    themeMode === "light" ? "primary-light" : "secondary-light"
                  }
                />
              </div>
            )}
          </div>
          <div className="library-main grid">
            {data.data.mangas.map((manga: ICardData) => {
              return (
                <Card
                  key={uuidv4()}
                  color={
                    themeMode === "light" ? "text-primary" : "text-secondary"
                  }
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
      {modalAddMangaSource &&
        createPortal(
          <AddMangaSourceModal onClose={() => setModalAddMangaSource(false)} />,
          document.body
        )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default Library;
