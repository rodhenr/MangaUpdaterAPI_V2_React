import { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { useFollowSourcesMutation } from "../../api/mutations/manga/MangaMutations";
import { useGetSourcesQuery } from "../../api/queries/manga/MangaQueries";
import ThemeContext from "../../shared/context/ThemeContext";

import Alert from "../alert/Alert";
import Button from "../button/Button";

import "./EditSourcesModal.scss";

interface Props {
  mangaId: number;
  onClose: () => void;
  showModal: boolean;
}

function EditSourcesModal({ mangaId, onClose, showModal }: Props) {
  const { themeMode } = useContext(ThemeContext);
  const [sourcesToFollow, setSourcesToFollow] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { data, error, isPending } = useGetSourcesQuery(mangaId);
  const followSourcesMutation = useFollowSourcesMutation();

  useEffect(() => {
    if (data) {
      const sourcesIds = data
        .filter((i) => i.isFollowing)
        .map((r) => r.sourceId);

      setSourcesToFollow(sourcesIds);
    }
  }, [data]);

  const handleSourceChange = (sourceId: number) => {
    if (!followSourcesMutation.isPending) {
      !sourcesToFollow.includes(sourceId)
        ? setSourcesToFollow((prev) => [...prev, sourceId])
        : setSourcesToFollow((prev) => prev.filter((i) => i !== sourceId));
    }
  };

  const handleMutation = async () => {
    if (data && data.length > 0) {
      await followSourcesMutation.mutateAsync({ mangaId, sourcesToFollow });

      setShowDialog(true);
      onClose();
    }
  };

  if (error) return "error...";

  return (
    <div
      className="align-center justify-center h-100 w-100 zIndex-100 roboto bg-modal-back absolute absolute-align border-box"
      style={{ display: !showModal ? "none" : "flex" }}
    >
      <div
        className={`editSources-main flex column gap-2 radius-1 shadow-3 ${
          themeMode === "light" ? "secondary-dark" : "primary-dark"
        }`}
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
                  disabled={
                    data.length > 0 && !followSourcesMutation.isPending
                      ? false
                      : true
                  }
                  loading={followSourcesMutation.isPending ? true : false}
                  onClick={() => handleMutation()}
                  text="Update"
                  useHover={true}
                  variant={data.length > 0 ? "success" : "bg-disabled"}
                />
                <Button
                  disabled={followSourcesMutation.isPending ? true : false}
                  onClick={onClose}
                  text="Cancel"
                  useHover={true}
                  variant={
                    !followSourcesMutation.isPending ? "danger" : "bg-disabled"
                  }
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
            variant={themeMode === "light" ? "bg-dark" : "bg-light"}
          />,
          document.getElementById("manga-page")!
        )}
    </div>
  );
}

export default EditSourcesModal;
