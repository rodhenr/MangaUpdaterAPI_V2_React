import Button from '../../../components/button/Button';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import { MangaSubInfoType, MangaTitleType } from '../Manga.types';
import { useUnfollowMangaMutation } from '../api/Mutations';
import Info from './Info';
import MangaInfo from './MangaInfo';

type ContentLeftMobilePropsType = {
  id: number;
  coverUrl: string;
  type: string;
  isUserFollowing: boolean;
  genres: MangaSubInfoType[];
  authors: MangaSubInfoType[];
  titles: MangaTitleType[];
  followers: number;
  setShowEditSourceModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFollowMutation: () => void;
};

const ContentLeftMobile: React.FC<ContentLeftMobilePropsType> = ({
  id,
  coverUrl,
  titles,
  authors,
  genres,
  isUserFollowing,
  type,
  followers,
  setShowEditSourceModal,
  handleFollowMutation,
}) => {
  const windowWidth = useGetWindowWidth();
  const unfollowMutation = useUnfollowMangaMutation();

  return (
    <>
      <div className="flex gap-3">
        <img
          className="radius-2"
          src={coverUrl}
          alt="cover"
          style={{
            minHeight: windowWidth > 600 ? 450 : 250,
            maxHeight: windowWidth > 600 ? 450 : 250,
          }}
        />
        <MangaInfo titles={titles} authors={authors} genres={genres} />
      </div>
      <div className="flex gap-2 w-100 space-between">
        <Button
          fontSize={windowWidth > 600 ? 'fsize-5' : 'fsize-4'}
          height="40px"
          icon={isUserFollowing ? 'gear' : null}
          onClick={
            isUserFollowing ? () => unfollowMutation.mutate(id) : () => handleFollowMutation()
          }
          onClickIcon={isUserFollowing ? () => setShowEditSourceModal(true) : () => null}
          text={isUserFollowing ? 'Following' : 'Follow'}
          useHover={true}
          variant={isUserFollowing ? 'success' : 'danger'}
          width={windowWidth > 600 ? '285px' : '160px'}
        />
        <Info description={type} header="Type" icon={'book'} />
        <Info description={followers.toString()} header="Users Tracking" icon={'users'} />
      </div>
    </>
  );
};

export default ContentLeftMobile;
