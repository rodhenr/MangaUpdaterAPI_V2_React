import { useState } from "react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../../lib/query-client";
import AxiosClient from "../../../lib/axios";

import { IMangaSource } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";
import Info from "../../../components/info/Info";
import EditSourcesModal from "../../../components/modal/EditSourcesModal";
import Sources from "./Sources";

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
  const axios = AxiosClient();

  const followMutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/user/mangas/${mangaId}`, []);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["sourceData", mangaId] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/user/mangas/${mangaId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["sourceData", mangaId] });
    },
  });

  const handleFollow = () => {
    if (isUserFollowing) {
      unfollowMutation.mutate();
      return;
    }

    followMutation.mutate();
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
          onClick={() => handleFollow()}
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
