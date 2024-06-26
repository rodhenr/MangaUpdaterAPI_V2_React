import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { VariantType } from '../../../components/Components.types';
import Button from '../../../components/button/Button';
import { formatDate } from '../../../utils/date';
import { truncateString } from '../../../utils/string';
import { ChapterInfoType } from '../Home.types';
import '../styles/CardWithInfo.scss';

type CardWithInfoPropsType = {
  buttonVariant: VariantType;
  chapters: ChapterInfoType[];
  cover: string;
  id: number;
  name: string;
  variant?: VariantType;
};

const CardWithInfo: React.FC<CardWithInfoPropsType> = ({
  buttonVariant,
  chapters,
  cover,
  id,
  name,
  variant = 'primary-light',
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/manga/${id}`);
  };

  return (
    <div
      className={`cardWithInfo-main flex-center gap-2 column roboto space-between radius-2 shadow-3 ${variant} border-box`}
    >
      <div className="w-100" style={{ minHeight: 150 }}>
        <img src={cover} alt={`image for ${name}`} className="h-100 w-100 object-cover" />
      </div>
      <div className="border-box flex column flex-1 gap-4 p-2 w-100">
        <div
          className="flex-center text-center cursor-pointer"
          style={{ height: 35 }}
          onClick={handleNavigate}
        >
          <h1 className="text-light">{truncateString(name, 48)}</h1>
        </div>
        <div className="flex column flex-1 gap-2" style={{ minHeight: 80 }}>
          {chapters.map((ch) => (
            <div key={uuidv4()} className="flex gap-1">
              <div className="flex-center flex-1 ">
                <p className="fsize-3-5">{formatDate(new Date(ch.date))}</p>
                <p className="fsize-3-5 text-center flex-1">Chapter {ch.number}</p>
              </div>
              <div className="flex-center gap-2">
                <Button
                  fontSize="fsize-3"
                  height="20px"
                  text={ch.sourceName}
                  variant={buttonVariant}
                  width="fit-content"
                />
                <div
                  className="round border-box"
                  style={{
                    backgroundColor: ch.isRead ? 'green' : 'red',
                    border: '1px solid #FFF',
                    height: 15,
                    width: 15,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardWithInfo;
