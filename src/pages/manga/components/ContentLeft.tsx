import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import Button from "../../../components/button/Button";
import Info from "../../../components/info/Info";
import { IMangaSource } from "../../../shared/interfaces/manga";
import Sources from "./Sources";

import "../Manga.scss";
import AuthContext from "../../../shared/context/AuthContext";
import { queryClient } from "../../../lib/query-client";

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
  const { userInfo } = useContext(AuthContext);

  const followMutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/user/mangas/${mangaId}`, [1], {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/user/mangas/${mangaId}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
    },
  });

  return (
    <div className="left-side flex column gap-4">
      <div className="flex column gap-1">
        <img
          className="radius-2"
          src={coverUrl}
          alt="cover"
          style={{ maxHeight: 450 }}
        />
        <Button
          fontSize="fsize-5"
          height="50px"
          icon="gear"
          onClick={() =>
            isUserFollowing
              ? unfollowMutation.mutate()
              : followMutation.mutate()
          }
          text={isUserFollowing ? "Following" : "Follow"}
          variant={isUserFollowing ? "success" : "danger"}
        />
      </div>
      <Sources sources={sources} />
      <div className="flex column gap-1">
        <Info description={type} header="Type" icon={"book"} />
        <Info description={"0"} header="Users Tracking" icon={"users"} />
      </div>
    </div>
  );
}

export default ContentLeft;
