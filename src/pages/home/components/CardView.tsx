import { Fragment, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ThemeContext from '../../../context/ThemeContext';
import { UserMangasResponseType } from '../Home.types';
import './../styles/CardView.scss';
import CardWithInfo from './CardWithInfo';

type CardViewPropsType = {
  data: UserMangasResponseType[][];
};

const CardView: React.FC<CardViewPropsType> = ({ data }) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="cardView-main grid">
      {data.map((response) =>
        response.map((manga) => (
          <Fragment key={uuidv4()}>
            <CardWithInfo
              buttonVariant={themeMode === 'light' ? 'secondary-dark' : 'secondary-light'}
              chapters={manga.recentChapters}
              cover={manga.coverUrl}
              id={manga.id}
              key={uuidv4()}
              name={manga.name}
              variant={themeMode === 'light' ? 'primary-light' : 'bg-card-dark'}
            />
          </Fragment>
        ))
      )}
    </div>
  );
};

export default CardView;
