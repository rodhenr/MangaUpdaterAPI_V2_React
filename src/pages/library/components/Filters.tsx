import { ChangeEvent } from 'react';
import { SelectStateType } from '../../../components/Components.types';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { FiltersType, MangaGenreType } from '../Library.types';
import SelectGroup from './SelectGroupt';

type FiltersPropsType = {
  filters: FiltersType;
  genres: MangaGenreType[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const Filters: React.FC<FiltersPropsType> = ({ filters, genres, onChange }) => {
  const genreList: SelectStateType[] = genres.map((genre) => ({
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
