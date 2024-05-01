import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SpinLoading from '../../components/loading/SpinLoading';
import AddMangaModal from '../../components/modal/AddMangaModal';
import AddMangaSourceModal from '../../components/modal/AddMangaSourceModal';
import { queryClient } from '../../lib/query-client';
import { IFilters } from '../../shared/interfaces/library';
import { useGetMangasGenresQuery, useGetMangasQuery } from './api/Queries';
import Cards from './components/Cards';
import Header from './components/Header';
import Info from './components/Info';
import Pagination from './components/Pagination';
import './styles/Library.scss';

const Library = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [modalAddManga, setModalAddManga] = useState<boolean>(false);
  const [modalAddMangaSource, setModalAddMangaSource] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    orderById: '',
    sourceId: '',
    genreId: '',
  });
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const { data, error, isPending } = useGetMangasQuery(currentPage, {
    ...filters,
    input: debouncedSearch,
  });

  const { data: genreData, error: genreError } = useGetMangasGenresQuery();

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 750);

    return () => clearTimeout(delayTimer);
  }, [search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    queryClient.invalidateQueries({ queryKey: ['libraryData'] });
  };

  if (error || genreError) return 'error...';

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        genres={genreData!}
      />
      {isPending ? (
        <SpinLoading />
      ) : (
        <div className="flex column content roboto mt-5 gap-4">
          <Info
            mangas={data.mangas}
            setModalAddManga={setModalAddManga}
            setModalAddMangaSource={setModalAddMangaSource}
          />
          <Cards mangas={data.mangas} />
          <Pagination
            currentPage={data.currentPage}
            onPageChange={handlePageChange}
            totalPages={data.totalPages}
          />
        </div>
      )}
      {modalAddManga &&
        createPortal(<AddMangaModal onClose={() => setModalAddManga(false)} />, document.body)}
      {modalAddMangaSource &&
        createPortal(
          <AddMangaSourceModal onClose={() => setModalAddMangaSource(false)} />,
          document.body
        )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default Library;
