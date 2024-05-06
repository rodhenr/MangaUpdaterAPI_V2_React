import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinLoading from '../../components/loading/SpinLoading';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import { useGetMangaQuery } from './api/Queries';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';
import SeeAlso from './components/SeeAlso';
import './styles/Manga.scss';

const Manga = () => {
  const { mangaId } = useParams();
  const { data, error, isPending, refetch, isRefetching } = useGetMangaQuery(mangaId);
  const windowWidth = useGetWindowWidth();

  useEffect(() => {
    refetch();
  }, [refetch, mangaId]);

  if (error) return 'error...';

  return isPending || isRefetching ? (
    <SpinLoading />
  ) : data ? (
    <>
      <div className="manga-main flex column gap-4 border-box relative" id="manga-page">
        <div className={`top flex gap-4 ${windowWidth > 800 ? 'row' : 'column'}`}>
          <ContentLeft data={data} />
          <ContentRight
            authors={data.authors}
            chapters={data.chapters}
            genres={data.genres}
            mangaId={data.id}
            titles={data.titles}
            synopsis={data.synopsis}
          />
        </div>
        <SeeAlso data={[]} />
      </div>
    </>
  ) : (
    <div>No data found!</div>
  );
};

export default Manga;
