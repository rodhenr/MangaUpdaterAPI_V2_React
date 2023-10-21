import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import DataTable, { TableColumn } from "react-data-table-component";

import { axios } from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";
import { IMangaChapter } from "../../../shared/interfaces/manga";
import { formatDate } from "../../../utils/date";
import Button from "../../../components/button/Button";

import "../Manga.scss";
import AuthContext from "../../../shared/context/AuthContext";

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
      console.log(chapterId);
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
          fontSize="fsize-3"
          height="20px"
          onClick={async () =>
            await chapterMutation.mutateAsync({
              chapterId: row.chapterId,
              mangaId: mangaId,
              sourceId: row.sourceId,
            })
          }
          text={row.read ? "Read" : "Not Read"}
          variant={row.read ? "success" : "danger"}
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
