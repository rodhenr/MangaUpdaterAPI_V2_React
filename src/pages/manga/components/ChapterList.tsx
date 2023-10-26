import { useMutation } from "@tanstack/react-query";
import DataTable, { TableColumn } from "react-data-table-component";

import { queryClient } from "../../../lib/query-client";
import AxiosClient from "../../../lib/axios";

import { formatDate } from "../../../utils/date";
import { IMangaChapter } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";

import "../Manga.scss";

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
  const axios = AxiosClient();

  const chapterMutation = useMutation({
    mutationFn: ({ chapterId, mangaId, sourceId }: IMutationData) => {
      return axios.patch(
        `api/user/mangas/${mangaId}/sources/${sourceId}?chapterId=${chapterId}`,
        {}
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
    },
  });

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
          disabled={!row.isUserAllowedToRead}
          fontSize="fsize-3"
          height="20px"
          onClick={
            row.isUserAllowedToRead && !row.read
              ? async () =>
                  await chapterMutation.mutateAsync({
                    chapterId: row.chapterId,
                    mangaId: mangaId,
                    sourceId: row.sourceId,
                  })
              : () => {}
          }
          text={
            !row.isUserAllowedToRead
              ? "Not following"
              : row.read
              ? "Read"
              : "Not Read"
          }
          variant={
            !row.isUserAllowedToRead
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
