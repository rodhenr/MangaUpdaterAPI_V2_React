import { useState, ChangeEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAddMangaSourceMutation } from "../../api/mutations/manga/MangaMutations";
import ThemeContext from "../../shared/context/ThemeContext";

import Input from "../input/Input";
import Button from "../button/Button";

import "./AddMangaSourceModal.scss";

interface Props {
  onClose: () => void;
}

function AddMangaSourceModal({ onClose }: Props) {
  const { themeMode } = useContext(ThemeContext);
  const [selectedMangaId, setSelectedMangaId] = useState<string>("");
  const [selectedSourceId, setSelectedSourceId] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const addMangaSourceMutation = useAddMangaSourceMutation();

  const handleMangaIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMangaId(event.target.value);
  };

  const handleSourceIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedSourceId(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleMutation = async () => {
    if (!selectedMangaId || !selectedSourceId) return;

    await addMangaSourceMutation.mutateAsync({
      mangaId: Number(selectedMangaId),
      sourceId: Number(selectedSourceId),
      url: url,
    });
    onClose();
  };

  return (
    <div className="absolute absolute-align flex-center roboto zIndex-100 bg-modal-back h-100 w-100">
      <div
        className={`addManga-main flex column border-box radius-2 p-4 ${
          themeMode === "light" ? "secondary-dark" : "primary-dark"
        }`}
        style={{ height: "350px", width: "400px" }}
      >
        <div className="flex space-between">
          <h1>Add new manga source</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={onClose}
          />
        </div>
        <div className="flex column gap-4 justify-center flex-1">
          <div className="flex column gap-1">
            <p>Manga</p>
            <Input
              id="mangaId"
              onChange={handleMangaIdChange}
              placeholder="Manga ID"
              value={selectedMangaId}
              variant="bg-light"
            />
          </div>
          <div className="flex column gap-1">
            <p>Source</p>
            <Input
              id="sourceId"
              onChange={handleSourceIdChange}
              placeholder="Source ID"
              value={selectedSourceId}
              variant="bg-light"
            />
          </div>
          <div className="flex column gap-1">
            <p>Url</p>
            <Input
              id="url"
              onChange={handleUrlChange}
              placeholder="URL"
              value={url}
              variant="bg-light"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            fontSize="fsize-3"
            onClick={async () => await handleMutation()}
            text="Add manga source"
            useHover={true}
            variant="primary-light"
            width="170px"
          />
        </div>
      </div>
    </div>
  );
}

export default AddMangaSourceModal;
