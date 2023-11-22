import { useState } from "react";
import { createPortal } from "react-dom";

import useGetWindowWidth from "../../../hooks/useGetWindowWidth";
import {
  useFollowMangaMutation,
  useUnfollowMangaMutation,
} from "../../../api/mutations/manga/MangaMutations";
import { queryClient } from "../../../lib/query-client";

import Sources from "./Sources";
import MangaInfo from "./MangaInfo";

import { IMangaData } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";
import Info from "../../../components/info/Info";
import EditSourcesModal from "../../../components/modal/EditSourcesModal";

import "../Manga.scss";

interface Props {
  data: IMangaData;
}

function ContentLeft({ data }: Props) {
  const [showEditSourceModal, setShowEditSourceModal] =
    useState<boolean>(false);
  const followMutation = useFollowMangaMutation();
  const unfollowMutation = useUnfollowMangaMutation();
  const windowWidth = useGetWindowWidth();

  const handleFollowMutation = () => {
    followMutation.mutate(data.mangaId);
    queryClient.invalidateQueries({ queryKey: ["homeData"] });

    setShowEditSourceModal(true);
  };

  const mobile = (
    <>
      <div className="flex gap-3">
        <img
          className="radius-2"
          src={data.coverUrl}
          alt="cover"
          style={{ maxHeight: windowWidth > 600 ? 450 : 250 }}
        />
        <MangaInfo
          alternativeName={data.alternativeName}
          artist={data.author}
          author={data.author}
          genres={data.genres}
          name={data.name}
        />
      </div>
      <div className="flex gap-2 w-100 space-between">
        <Button
          fontSize={windowWidth > 600 ? "fsize-5" : "fsize-4"}
          height="40px"
          icon={data.isUserFollowing ? "gear" : null}
          onClick={
            data.isUserFollowing
              ? () => unfollowMutation.mutate(data.mangaId)
              : () => handleFollowMutation()
          }
          onClickIcon={
            data.isUserFollowing
              ? () => setShowEditSourceModal(true)
              : () => null
          }
          text={data.isUserFollowing ? "Following" : "Follow"}
          useHover={true}
          variant={data.isUserFollowing ? "success" : "danger"}
          width={windowWidth > 600 ? "285px" : "160px"}
        />
        <Info description={data.type} header="Type" icon={"book"} />
        <Info description={"0"} header="Users Tracking" icon={"users"} />
      </div>
    </>
  );

  const desktop = (
    <>
      <div className="flex column gap-2">
        <img
          className="radius-2"
          src={data.coverUrl}
          alt="cover"
          style={{ maxHeight: 450 }}
        />
        <Button
          fontSize="fsize-5"
          height="40px"
          icon={data.isUserFollowing ? "gear" : null}
          onClick={
            data.isUserFollowing
              ? () => unfollowMutation.mutate(data.mangaId)
              : () => handleFollowMutation()
          }
          onClickIcon={
            data.isUserFollowing
              ? () => setShowEditSourceModal(true)
              : () => null
          }
          text={data.isUserFollowing ? "Following" : "Follow"}
          useHover={true}
          variant={data.isUserFollowing ? "success" : "danger"}
        />
      </div>
      <Sources sources={data.sources} />
      <div className="flex column gap-2">
        <Info description={data.type} header="Type" icon={"book"} />
        <Info description={"0"} header="Users Tracking" icon={"users"} />
      </div>
    </>
  );

  return (
    <div className="left-side flex column gap-4">
      {windowWidth > 800 ? desktop : mobile}
      {createPortal(
        <EditSourcesModal
          mangaId={data.mangaId}
          onClose={() => setShowEditSourceModal(false)}
          showModal={showEditSourceModal}
        />,
        document.body
      )}
    </div>
  );
}

export default ContentLeft;
