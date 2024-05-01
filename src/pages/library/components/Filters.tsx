import { ChangeEvent } from 'react';
import SelectGroup from '../../../components/select/SelectGroupt';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { ISelectState } from '../../../shared/interfaces/components';
import { IFilters } from '../../../shared/interfaces/library';
import { IMangaGenre } from '../api/Queries';

type Props = {
  filters: IFilters;
  genres: IMangaGenre[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const Filters = ({ filters, genres, onChange }: Props) => {
  const genreList: ISelectState[] = genres.map((genre) => ({
    description: genre.name,
    value: String(genre.id),
    isHidden: false,
  }));
  const windowWidth = useGetWindowWidth();

  return (
    <div className={`flex ${windowWidth > 900 ? 'gap-4' : 'gap-1'}`}>
      <SelectGroup
        name={'orderById'}
        onChange={onChange}
        options={[
          {
            description: 'A-Z',
            value: 'alphabet',
            isHidden: false,
          },
          {
            description: 'Latest',
            value: 'latest',
            isHidden: false,
          },
        ]}
        placeholder="Order By"
        value={filters.orderById}
      />
      <SelectGroup
        name={'sourceId'}
        onChange={onChange}
        options={[
          {
            description: 'All',
            value: '',
            isHidden: false,
          },
          {
            description: 'MangaDex',
            value: '1',
            isHidden: false,
          },
          {
            description: 'AsuraScans',
            value: '2',
            isHidden: false,
          },
        ]}
        placeholder="Sources"
        value={filters.sourceId}
      />
      <SelectGroup
        name={'genreId'}
        onChange={onChange}
        options={[
          {
            description: 'All',
            value: '',
            isHidden: false,
          },
          ...genreList,
        ]}
        placeholder="Genres"
        value={filters.genreId}
      />
    </div>
  );
};

export default Filters;
