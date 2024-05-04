import { useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ThemeContext from '../../../context/ThemeContext';

type PaginationPropsType = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const Pagination: React.FC<PaginationPropsType> = ({ currentPage, onPageChange, totalPages }) => {
  const { themeMode } = useContext(ThemeContext);
  const [pagesToRender, setPagesToRender] = useState<number[]>([]);

  const startPage = currentPage - 5 > 0 ? currentPage - 5 : 1;
  const endPage = currentPage + 5 < totalPages ? currentPage + 5 : totalPages;

  const pages: number[] = useMemo(() => {
    const pagesArray: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }, [startPage, endPage]);

  useEffect(() => {
    setPagesToRender(pages);
  }, [pages]);

  return (
    <div className="flex-center gap-4">
      {pagesToRender.map((page) => (
        <div
          key={uuidv4()}
          className={`cursor-pointer fsize-5 ${
            currentPage !== page
              ? ''
              : themeMode === 'light'
              ? 'primary-light primary-light-hover'
              : 'bg-light bg-light-hover'
          } p-2`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
