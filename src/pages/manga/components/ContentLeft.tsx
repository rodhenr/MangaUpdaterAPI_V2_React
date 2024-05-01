import { useState } from 'react';
import { createPortal } from 'react-dom';
import SpinLoading from '../../../components/loading/SpinLoading';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { IMangaResponse, useGetUsersFollowing } from '../api/Queries';
import '../styles/Manga.scss';
import ContentLeftDesktop from './ContentLeftDesktop';
import ContentLeftMobile from './ContentLeftMobile';
import EditSourcesModal from './EditSourcesModal';

type Props = {
  data: IMangaResponse;
};

const ContentLeft = ({ data }: Props) => {
  const [showEditSourceModal, setShowEditSourceModal] = useState<boolean>(false);
  const windowWidth = useGetWindowWidth();
  const { data: followsData, isPending } = useGetUsersFollowing(data.id);

  return (
    <div className="left-side flex column gap-4">
      {isPending ? (
        <SpinLoading />
      ) : windowWidth > 800 ? (
        <ContentLeftDesktop
          id={data.id}
          coverUrl={data.coverUrl}
          type={data.type}
          sources={data.sources}
          isUserFollowing={data.isUserFollowing}
          followers={followsData!.followers}
          setShowEditSourceModal={setShowEditSourceModal}
        />
      ) : (
        <ContentLeftMobile
          id={data.id}
          coverUrl={data.coverUrl}
          type={data.type}
          isUserFollowing={data.isUserFollowing}
          genres={data.genres}
          authors={data.authors}
          titles={data.titles}
          followers={followsData!.followers}
          setShowEditSourceModal={setShowEditSourceModal}
        />
      )}
      {createPortal(
        <EditSourcesModal
          mangaId={data.id}
          onClose={() => setShowEditSourceModal(false)}
          showModal={showEditSourceModal}
        />,
        document.body
      )}
    </div>
  );
};

export default ContentLeft;
