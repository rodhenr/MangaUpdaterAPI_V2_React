import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";

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

  createTheme("light", {
    text: {
      primary: "#fefefe",
      secondary: "#fefefe",
    },
    background: {
      default: "#0e86d4",
    },
    context: {
      background: "#cb4b16",
      text: "#fefefe",
    },
    divider: {
      default: "#fefefe",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
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
      theme="light"
    />
  );
}

export default ChapterList;
