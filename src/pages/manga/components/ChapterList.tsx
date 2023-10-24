import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import DataTable, { TableColumn } from "react-data-table-component";
import { v4 as uuidv4 } from "uuid";

import { axios } from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";
import { IMangaChapter } from "../../../shared/interfaces/manga";
import { formatDate } from "../../../utils/date";
import Button from "../../../components/button/Button";

import "../Manga.scss";
import AuthContext from "../../../shared/context/AuthContext";
import { chapterMessage, chapterVariant } from "../../../utils/chapter";

interface Props {
  chapters: IMangaChapter[];
  mangaId: number;
}

interface IMutationData {
  chapterId: number;
  mangaId: number;
  sourceId: number;
}

function ChapterList({ chapters, mangaId }: Props) {
  const { userInfo } = useContext(AuthContext);

  const chapterMutation = useMutation({
    mutationFn: ({ chapterId, mangaId, sourceId }: IMutationData) => {
      return axios.patch(
        `api/user/mangas/${mangaId}/sources/${sourceId}?chapterId=${chapterId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
    },
  });

  console.log(chapters);

  const columns: TableColumn<IMangaChapter>[] = [
    {
      name: "Date",
      selector: (row) => formatDate(new Date(row.date)),
      sortable: true,
    },
    {
      name: "Chapter",
      selector: (row) => `Chapter ${row.number}`,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.sourceName,
    },
    {
      name: "Status",
      cell: (row) => (
        <Button
          disabled={!row.IsUserAllowedToRead}
          fontSize="fsize-3"
          height="20px"
          onClick={
            row.IsUserAllowedToRead
              ? () =>
                  chapterMutation.mutateAsync({
                    chapterId: row.chapterId,
                    mangaId: mangaId,
                    sourceId: row.sourceId,
                  })
              : () => {}
          }
          text={
            !row.IsUserAllowedToRead
              ? "Not following"
              : row.read
              ? "Read"
              : "Not Read"
          }
          variant={
            !row.IsUserAllowedToRead
              ? "bg-disabled"
              : row.read
              ? "success"
              : "danger"
          }
          width="fit-content"
        />
      ),
    },
  ];

  return (
    <DataTable
      dense
      columns={columns}
      data={chapters}
      highlightOnHover
      pagination
      striped
    />
  );
}

export default ChapterList;
