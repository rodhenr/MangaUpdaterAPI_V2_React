import { ChangeEvent, useContext } from 'react';
import Input from '../../../components/input/Input';
import PageHeader from '../../../components/pageHeader/PageHeader';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { queryClient } from '../../../lib/query-client';
import ThemeContext from '../../../shared/context/ThemeContext';
import { IFilters } from '../../../shared/interfaces/library';
import { IMangaGenre } from '../api/Queries';
import Filters from './Filters';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  genres: IMangaGenre[];
};

const Header = ({ search, setSearch, filters, setFilters, genres }: Props) => {
  const windowWidth = useGetWindowWidth();
  const { themeMode } = useContext(ThemeContext);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFiltersChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    queryClient.invalidateQueries({ queryKey: ['libraryData'] });
  };

  return (
    <div className="w-10 flex column gap-2">
      <PageHeader>
        <p className="fsize-5">Library</p>
      </PageHeader>
      <div className={`flex space-between ${windowWidth < 900 && 'column gap-2'} w-100`}>
        <Input
          placeholder="Search for a manga"
          type="search"
          iconSide="left"
          id={'searchManga'}
          icon="search"
          width={windowWidth > 900 ? '350px' : 'auto'}
          value={search}
          onChange={handleSearch}
          variant={themeMode === 'light' ? 'primary-light' : 'bg-light'}
        />
        <Filters onChange={handleFiltersChange} filters={filters} genres={genres ?? []} />
      </div>
    </div>
  );
};

export default Header;
