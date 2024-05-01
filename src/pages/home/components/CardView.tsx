import { Fragment, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ThemeContext from '../../../shared/context/ThemeContext';
import { IMangasResponse } from '../api/Queries';
import './../styles/CardView.scss';
import CardWithInfo from './CardWithInfo';

type Props = {
  data: IMangasResponse[];
};

const CardView = ({ data }: Props) => {
  const { themeMode } = useContext(ThemeContext);

  console.log(data);

  return (
    <div className="cardView-main grid">
      {data.map((response) => (
        <Fragment key={uuidv4()}>
          {response.mangas.map((info) => (
            <CardWithInfo
              buttonVariant={themeMode === 'light' ? 'secondary-dark' : 'secondary-light'}
              chapters={info.recentChapters}
              cover={info.coverUrl}
              id={info.mangaId}
              key={uuidv4()}
              name={info.mangaName}
              variant={themeMode === 'light' ? 'primary-light' : 'bg-card-dark'}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default CardView;
