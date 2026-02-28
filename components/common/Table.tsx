import React from "react";
import Pagination from "./Pagination";
import Search from "./Search";

type Props<T = Record<string, unknown>> = {
  columns: {
    id: string;
    header: string;
    accessorKey: string;
    cell?: (row: T) => React.ReactNode;
  }[];
  data: T[];
  numberOfAllItems: number;
  numberOfShowingItems: number;
  numberOfPages: number;
  currentPage: number;
  isLoading?: boolean;
};

function Table<T = Record<string, unknown>>({
  columns,
  data,
  numberOfAllItems,
  numberOfShowingItems,
  numberOfPages,
  currentPage,
  isLoading,
}: Props<T>) {
  return (
    <>
      <div className="h-[calc(100vh-16rem)] overflow-auto my-1">
        <table className="table table-zebra table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              {/* select label */}
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>#</th>
              {columns.map((column) => (
                <th key={column.id}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="h-52">
                <td colSpan={columns.length + 2}>
                  <div className="h-full flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg size-24" />
                  </div>
                </td>
              </tr>
            ) : !data.length ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={String(
                    (row as Record<string, unknown>)?._id ||
                      (row as Record<string, unknown>)[columns[0].accessorKey],
                  )}
                >
                  {/* select label */}
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <th>
                    {i + 1 + (currentPage - 1) * numberOfShowingItems || ++i}{" "}
                    {/* Row number */}
                  </th>
                  {columns.map((column) => (
                    <td key={column.id}>
                      {column.cell
                        ? column.cell(row)
                        : String(
                            (row as Record<string, unknown>)?.[
                              column.accessorKey
                            ],
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {numberOfPages > 0 && (
        <div className="flex justify-end items-center mt-4 gap-2">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {numberOfShowingItems > numberOfAllItems
              ? numberOfAllItems
              : numberOfShowingItems}{" "}
            of {numberOfAllItems} items
          </p>
          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
        </div>
      )}
    </>
  );
}

export default Table;
