import Button from '../../../components/button/Button';
import { useUnfollowMangaMutation } from '../api/Mutations';
import { IMangaSubInfo } from '../api/Queries';
import Info from './Info';
import Sources from './Sources';

type Props = {
  id: number;
  coverUrl: string;
  isUserFollowing: boolean;
  sources: IMangaSubInfo[];
  type: string;
  followers: number;
  setShowEditSourceModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFollowMutation: () => void;
};

const ContentLeftDesktop = ({
  id,
  coverUrl,
  isUserFollowing,
  sources,
  type,
  followers,
  setShowEditSourceModal,
  handleFollowMutation,
}: Props) => {
  const unfollowMutation = useUnfollowMangaMutation();

  return (
    <>
      <div className="flex column gap-2">
        <img className="radius-2" src={coverUrl} alt="cover" style={{ maxHeight: 450 }} />
        <Button
          fontSize="fsize-5"
          height="40px"
          icon={isUserFollowing ? 'gear' : null}
          onClick={
            isUserFollowing ? () => unfollowMutation.mutate(id) : () => handleFollowMutation()
          }
          onClickIcon={isUserFollowing ? () => setShowEditSourceModal(true) : () => null}
          text={isUserFollowing ? 'Following' : 'Follow'}
          useHover={true}
          variant={isUserFollowing ? 'success' : 'danger'}
        />
      </div>
      <Sources sources={sources} />
      <div className="flex column gap-2">
        <Info description={type} header="Type" icon={'book'} />
        <Info description={followers.toString()} header="Users Tracking" icon={'users'} />
      </div>
    </>
  );
};

export default ContentLeftDesktop;
