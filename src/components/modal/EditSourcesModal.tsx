import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { queryClient } from "../../lib/query-client";
import AxiosClient from "../../lib/axios";

import AuthContext from "../../shared/context/AuthContext";
import { IUserSource } from "../../shared/interfaces/source";
import Button from "../button/Button";
import Alert from "../alert/Alert";

import "./EditSourcesModal.scss";

interface Props {
  mangaId: number;
  onClose: () => void;
  showModal: boolean;
}

function EditSourcesModal({ mangaId, onClose, showModal }: Props) {
  const { userInfo } = useContext(AuthContext);
  const [sourcesToFollow, setSourcesToFollow] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const axios = AxiosClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["sourceData", mangaId],
    queryFn: () =>
      axios.get<IUserSource[]>(`/api/manga/${mangaId}/sources`).then((res) => {
        const sourcesIds = res.data
          .filter((i) => i.isFollowing)
          .map((r) => r.sourceId);
        setSourcesToFollow(sourcesIds);

        return res.data;
      }),
    enabled: !!userInfo.token,
  });

  const { mutate, isPending: mutatePending } = useMutation({
    mutationFn: async () => {
      return await axios.post(`/api/user/mangas/${mangaId}`, sourcesToFollow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sourceData", mangaId] });
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });

      setShowDialog(true);

      onClose();
    },
  });

  const handleSourceChange = (sourceId: number) => {
    if (!mutatePending) {
      !sourcesToFollow.includes(sourceId)
        ? setSourcesToFollow((prev) => [...prev, sourceId])
        : setSourcesToFollow((prev) => prev.filter((i) => i !== sourceId));
    }
  };

  if (error) return "error...";

  const handleUpdateSource = () => {
    data && data.length > 0 && mutate();
  };

  return (
    <div
      className="align-center justify-center h-100 w-100 zIndex-100 roboto bg-modal-back absolute absolute-align border-box"
      style={{ display: !showModal ? "none" : "flex" }}
    >
      <div
        className="editSources-main flex column gap-2 secondary-dark radius-1 shadow-3"
        style={{
          height: 180,
          width: 330,
        }}
      >
        <div className="flex align-center space-between">
          <h1 className="poppins fweight-2 fsize-5">Add/Remove Sources</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={onClose}
          />
        </div>
        <div className="flex column flex-1">
          {isPending ? (
            <div>loading...</div>
          ) : data !== undefined ? (
            <>
              <div className="flex column flex-1 justify-center gap-2 flex-wrap">
                {data.length > 0 ? (
                  data.map((source) => (
                    <Button
                      fontSize="fsize-3"
                      height="20px"
                      key={uuidv4()}
                      onClick={() => handleSourceChange(source.sourceId)}
                      text={source.sourceName}
                      variant={
                        sourcesToFollow.includes(source.sourceId)
                          ? "primary-light"
                          : "bg-disabled"
                      }
                      width="fit-content"
                    />
                  ))
                ) : (
                  <div>
                    <p>No sources available</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  disabled={data.length > 0 && !mutatePending ? false : true}
                  loading={mutatePending ? true : false}
                  onClick={() => handleUpdateSource()}
                  text="Update"
                  useHover={true}
                  variant={data.length > 0 ? "success" : "bg-disabled"}
                />
                <Button
                  disabled={mutatePending ? true : false}
                  onClick={onClose}
                  text="Cancel"
                  useHover={true}
                  variant={!mutatePending ? "danger" : "bg-disabled"}
                />
              </div>
            </>
          ) : (
            <div>Error...</div>
          )}
        </div>
      </div>
      {showDialog &&
        createPortal(
          <Alert
            message="Sources updated"
            onClose={() => setShowDialog(false)}
            width={"350px"}
            variant="bg-dark"
          />,
          document.getElementById("manga-page")!
        )}
    </div>
  );
}

export default EditSourcesModal;
