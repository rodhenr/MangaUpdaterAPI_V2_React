import { v4 as uuidv4 } from "uuid";
import DataTable, { TableColumn } from "react-data-table-component";

import { IMangaChapter } from "../../../shared/interfaces/manga";
import { formatDate } from "../../../utils/date";
import Button from "../../../components/button/Button";

import "../Manga.scss";

interface Props {
  chapters: IMangaChapter[];
}

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
        text={row.read ? "Read" : "Not Read"}
        variant={row.read ? "success" : "danger"}
        width="fit-content"
      />
    ),
  },
];

function ChapterList({ chapters }: Props) {
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
