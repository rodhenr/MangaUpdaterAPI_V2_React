import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../lib/query-client";
import AxiosClient from "../../lib/axios";

import Input from "../input/Input";
import Button from "../button/Button";

import "./AddMangaModal.scss";

interface Props {
  onClose: () => void;
}

function AddMangaModal({ onClose }: Props) {
  const [malId, setMalId] = useState<string>("");
  const axios = AxiosClient();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMalId(event.target.value);
  };

  const addMangaMutation = useMutation({
    mutationFn: () => axios.post(`/api/manga/?malId=${malId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryData"] });
      onClose();
    },
  });

  return (
    <div className="absolute absolute-align flex-center roboto zIndex-100 bg-modal-back h-100 w-100">
      <div
        className="addManga-main flex column secondary-dark border-box radius-2 p-4"
        style={{ height: "200px", width: "400px" }}
      >
        <div className="flex space-between">
          <h1>Add new manga</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={onClose}
          />
        </div>
        <div className="flex-center flex-1">
          <Input
            id="malId"
            onChange={handleOnChange}
            placeholder="MyAnimeList ID"
            value={malId}
            variant="bg-light"
          />
        </div>
        <div className="flex justify-center">
          <Button
            fontSize="fsize-3"
            onClick={() => addMangaMutation.mutate()}
            text="Add manga"
            useHover={true}
            variant="primary-light"
            width="170px"
          />
        </div>
      </div>
    </div>
  );
}

export default AddMangaModal;
