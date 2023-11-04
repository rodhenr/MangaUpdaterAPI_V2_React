import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

function Pagination({ currentPage, onPageChange, totalPages }: Props) {
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
            currentPage === page && "primary-light primary-light-hover"
          } p-2`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
