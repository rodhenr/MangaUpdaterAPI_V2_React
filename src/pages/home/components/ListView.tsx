import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { formatDate } from '../../../utils/date';
import { UserMangasResponseType } from '../Home.types';
import './../styles/ListView.scss';

type ListViewPropsType = {
  data: UserMangasResponseType[][];
};

type CompleteChapterInfoType = {
  id: number;
  coverUrl: string;
  name: string;
  chapter: ChapterType;
};

type ChapterType = {
  id: number;
  sourceId: number;
  sourceName: string;
  date: Date;
  number: string;
  isUserAllowedToRead: boolean;
  isRead: boolean;
};

const ListView: React.FC<ListViewPropsType> = ({ data }) => {
  const { themeMode } = useContext(ThemeContext);
  const [chaptersSorted, setChaptersSorted] = useState<CompleteChapterInfoType[]>([]);
  const navigate = useNavigate();
  const windowWidth = useGetWindowWidth();

  const handleNavigate = (id: number) => {
    navigate(`/manga/${id}`);
  };

  useEffect(() => {
    const chapters: {
      id: number;
      coverUrl: string;
      name: string;
      chapter: ChapterType;
    }[] = [];

    data[0].forEach((x) => {
      x.recentChapters.forEach((y) => {
        chapters.push({
          id: x.id,
          coverUrl: x.coverUrl,
          name: x.name,
          chapter: {
            ...y,
            date: new Date(y.date),
          },
        });
      });
    });

    chapters.sort((a, b) => b.chapter.date.getTime() - a.chapter.date.getTime());

    setChaptersSorted(chapters);
  }, []); // TODO: implement caching

  return (
    <div className="flex column space-between flex-wrap">
      <div
        className={`header flex space-between pv-2 ${
          themeMode === 'light'
            ? 'border-secondary-dark-1 secondary-dark'
            : 'border-secondary-light-1 bg-menu-dark text-secondary-light'
        }`}
      >
        <p className="flex-1 text-center">Manga</p>
        <p className="column-width text-center">Date</p>
        <p className="column-width text-center">Chapter</p>
        <p className="column-width text-center">Source</p>
        <p className="column-width text-center">Status</p>
      </div>
      <div>
        {chaptersSorted.map((manga, index) => (
          <div
            key={uuidv4()}
            className={`flex align-center space-between pv-2 ${
              index % 2 !== 0
                ? themeMode === 'light'
                  ? 'primary-light border-secondary-dark-left-1 border-secondary-dark-right-1'
                  : 'bg-menu-dark bg-dark border-secondary-light-left-1 border-secondary-light-right-1 border-bottom-light'
                : themeMode === 'light'
                ? 'bg-light border-secondary-dark-left-1 border-secondary-dark-right-1 border-bottom-primary-light'
                : 'bg-dark border-secondary-light-left-1 border-secondary-light-right-1 border-bottom-light'
            }`}
          >
            <div className="flex-1 text-center ph-1 ">
              <span className="fsize-3-5 cursor-pointer" onClick={() => handleNavigate(manga.id)}>
                {manga.name}
              </span>
            </div>
            <p className="column-width text-center fsize-3-5">
              {formatDate(new Date(manga.chapter.date))}
            </p>
            <p className="column-width text-center fsize-3-5">Chapter {manga.chapter.number}</p>
            <div className="flex-center column-width text-center fsize-3-5">
              <Button
                fontSize="fsize-3"
                height={windowWidth > 900 ? '20px' : '30px'}
                mouseover={false}
                onClick={() => null}
                text={manga.chapter.sourceName}
                variant={themeMode === 'light' ? 'secondary-dark' : 'primary-light'}
                width={windowWidth > 900 ? '100px' : '50px'}
              />
            </div>
            <div className="flex-center column-width text-center">
              <Button
                fontSize="fsize-3"
                height={windowWidth > 900 ? '20px' : '30px'}
                mouseover={false}
                onClick={() => null}
                text={manga.chapter.isRead ? 'Read' : 'Not Read'}
                variant={manga.chapter.isRead ? 'success' : 'danger'}
                width={windowWidth > 900 ? '100px' : '50px'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
