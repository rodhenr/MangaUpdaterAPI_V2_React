import { useState } from "react";
import { createPortal } from "react-dom";

import { IMangaSource } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";
import Info from "../../../components/info/Info";
import EditSourcesModal from "../../../components/modal/EditSourcesModal";
import Sources from "./Sources";
import {
  useFollowMangaMutation,
  useUnfollowMangaMutation,
} from "../../../api/mutations/manga/MangaMutations";

import "../Manga.scss";

interface Props {
  coverUrl: string;
  isUserFollowing: boolean;
  mangaId: number;
  sources: IMangaSource[];
  type: string;
}

function ContentLeft({
  coverUrl,
  isUserFollowing,
  mangaId,
  sources,
  type,
}: Props) {
  const [showEditSourceModal, setShowEditSourceModal] =
    useState<boolean>(false);
  const followMutation = useFollowMangaMutation();
  const unfollowMutation = useUnfollowMangaMutation();

  const handleFollowMutation = () => {
    console.log("here");
    followMutation.mutate(mangaId);

    setShowEditSourceModal(true);
  };

  return (
    <div className="left-side flex column gap-4">
      <div className="flex column gap-2">
        <img
          className="radius-2"
          src={coverUrl}
          alt="cover"
          style={{ maxHeight: 450 }}
        />
        <Button
          fontSize="fsize-5"
          height="40px"
          icon={isUserFollowing ? "gear" : null}
          onClick={
            isUserFollowing
              ? () => unfollowMutation.mutate(mangaId)
              : () => handleFollowMutation()
          }
          onClickIcon={
            isUserFollowing ? () => setShowEditSourceModal(true) : () => null
          }
          text={isUserFollowing ? "Following" : "Follow"}
          useHover={true}
          variant={isUserFollowing ? "success" : "danger"}
        />
      </div>
      <Sources sources={sources} />
      <div className="flex column gap-1">
        <Info description={type} header="Type" icon={"book"} />
        <Info description={"0"} header="Users Tracking" icon={"users"} />
      </div>
      {createPortal(
        <EditSourcesModal
          mangaId={mangaId}
          onClose={() => setShowEditSourceModal(false)}
          showModal={showEditSourceModal}
        />,
        document.body
      )}
    </div>
  );
}

export default ContentLeft;
