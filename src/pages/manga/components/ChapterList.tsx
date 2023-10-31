import DataTable, { TableColumn } from "react-data-table-component";

import { useChapterReadStateMutation } from "../../../api/mutations/manga/MangaMutations";

import { formatDate } from "../../../utils/date";
import { IMangaChapter } from "../../../shared/interfaces/manga";
import Button from "../../../components/button/Button";

import "../Manga.scss";

interface Props {
  chapters: IMangaChapter[];
  mangaId: number;
}

function ChapterList({ chapters, mangaId }: Props) {
  const chapterMutation = useChapterReadStateMutation();

  const handleChapterMutation = async (
    isUserAllowedToRead: boolean,
    read: boolean,
    chapterId: number,
    sourceId: number
  ) => {
    if (isUserAllowedToRead && !read) {
      await chapterMutation.mutateAsync({
        chapterId: chapterId,
        mangaId: mangaId,
        sourceId: sourceId,
      });
    }
  };

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
          onClick={() =>
            handleChapterMutation(
              row.isUserAllowedToRead,
              row.read,
              row.chapterId,
              row.sourceId
            )
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
