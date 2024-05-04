import { ChangeEvent, useContext } from 'react';
import { queryClient } from '../../../api/query-client';
import Input from '../../../components/input/Input';
import PageHeader from '../../../components/pageHeader/PageHeader';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { FiltersType, MangaGenreType } from '../Library.types';
import Filters from './Filters';

type HeaderPropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  genres: MangaGenreType[];
};

const Header: React.FC<HeaderPropsType> = ({ search, setSearch, filters, setFilters, genres }) => {
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
