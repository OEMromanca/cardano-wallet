import { useCallback, useMemo, useState } from "react";
import "./Table.css";
import Button from "../button/Button";

interface TableColumn<T> {
  label: string;
  dataKey: keyof T;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  maxItems: number;
}

const Table = <T,>({ columns, data, maxItems }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / maxItems);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  const { currentPageData, startIndex } = useMemo(() => {
    const startIndex = (currentPage - 1) * maxItems;
    const endIndex = startIndex + maxItems;
    const filteredData = data.filter(
      (_, index) => index >= startIndex && index < endIndex
    );
    return { currentPageData: filteredData, startIndex };
  }, [currentPage, data, maxItems]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.dataKey)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <tr key={startIndex + index}>
              {columns.map((column) => (
                <td key={String(column.dataKey)}>
                  {String(item[column.dataKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="text-only"
        >
          &lt; Prejšla stránka
        </Button>
        <span>
          Stránka {currentPage} z {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="text-only"
        >
          Ďalšia stránka &gt;
        </Button>
      </div>
    </div>
  );
};

export default Table;
