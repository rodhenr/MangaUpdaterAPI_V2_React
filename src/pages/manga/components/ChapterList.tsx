import { useContext } from 'react';
import DataTable, { TableColumn, createTheme } from 'react-data-table-component';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import { formatDate } from '../../../utils/date';
import { MangaChapterType } from '../Manga.types';
import { useChapterReadStateMutation } from '../api/Mutations';
import '../styles/Manga.scss';

type ChapterListPropsType = {
  chapters: MangaChapterType[];
  mangaId: number;
};

const ChapterList: React.FC<ChapterListPropsType> = ({ chapters, mangaId }) => {
  const { themeMode } = useContext(ThemeContext);

  const chapterMutation = useChapterReadStateMutation();

  const handleChapterMutation = async (
    isUserAllowedToRead: boolean,
    chapterId: number,
    sourceId: number
  ) => {
    if (isUserAllowedToRead) {
      await chapterMutation.mutateAsync({
        chapterId: chapterId,
        mangaId: mangaId,
        sourceId: sourceId,
      });
    }
  };

  createTheme('light', {
    text: {
      primary: '#fefefe',
      secondary: '#fefefe',
    },
    background: {
      default: '#0e86d4',
    },
    context: {
      background: '#cb4b16',
      text: '#fefefe',
    },
    divider: {
      default: '#fefefe',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

  createTheme('dark', {
    text: {
      primary: '#fefefe',
      secondary: '#fefefe',
    },
    background: {
      default: '#3e3e3e',
    },
    context: {
      background: '#cb4b16',
      text: '#fefefe',
    },
    divider: {
      default: '#fefefe',
    },
    action: {
      button: 'rgba(255,255,255,.54)',
      hover: 'rgba(255,255,255,.08)',
      disabled: 'rgba(255,255,255,.12)',
    },
  });

  const columns: TableColumn<MangaChapterType>[] = [
    {
      name: 'Date',
      selector: (row) => formatDate(new Date(row.date)),
      sortable: true,
    },
    {
      name: 'Chapter',
      selector: (row) => `Chapter ${row.number}`,
      sortable: true,
    },
    {
      name: 'Source',
      selector: (row) => row.sourceName,
    },
    {
      name: 'Status',
      cell: (row) => (
        <Button
          disabled={!row.isUserAllowedToRead}
          fontSize="fsize-3"
          height="20px"
          onClick={() => handleChapterMutation(row.isUserAllowedToRead, row.id, row.sourceId)}
          text={!row.isUserAllowedToRead ? 'Not following' : row.isRead ? 'Read' : 'Not Read'}
          variant={!row.isUserAllowedToRead ? 'bg-disabled' : row.isRead ? 'success' : 'danger'}
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
      theme={themeMode === 'light' ? 'light' : 'dark'}
    />
  );
};

export default ChapterList;
