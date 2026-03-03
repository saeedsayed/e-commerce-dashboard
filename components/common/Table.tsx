"use client";

import React, { useMemo, useState } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import { AArrowDown, AArrowUp, MoveVertical } from "lucide-react";

type Props<T = Record<string, unknown>> = {
  columns: {
    id: string;
    header: string;
    accessorKey: string;
    cell?: (row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
  }[];
  data: T[];
  numberOfAllItems: number;
  numberOfShowingItems: number;
  numberOfPages: number;
  currentPage: number;
  isLoading?: boolean;
};

type SortDirection = "asc" | "desc";

const getNestedValue = (obj: Record<string, unknown>, path: string): unknown =>
  path.split(".").reduce<unknown>((acc, key) => {
    if (Array.isArray(acc)) {
      return acc.map((item) => {
        if (item && typeof item === "object") {
          return (item as Record<string, unknown>)[key];
        }
        return undefined;
      });
    }
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

const normalizeValue = (value: unknown): string => {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(normalizeValue).join(" ");
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map(normalizeValue)
      .join(" ");
  }
  return String(value).toLowerCase();
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
  const [sortConfig, setSortConfig] = useState<{
    id: string;
    direction: SortDirection;
  } | null>(null);

  const handleSort = (columnId: string, sortable = true) => {
    if (!sortable) return;
    setSortConfig((prev) => {
      if (!prev || prev.id !== columnId)
        return { id: columnId, direction: "asc" };
      if (prev.direction === "asc") return { id: columnId, direction: "desc" };
      return null;
    });
  };

  const processedData = useMemo(() => {
    const rows = [...data];

    if (!sortConfig) return rows;

    const sortColumn = columns.find((column) => column.id === sortConfig.id);
    if (!sortColumn) return rows;

    return [...data].sort((a, b) => {
      const aVal = normalizeValue(
        getNestedValue(a as Record<string, unknown>, sortColumn.accessorKey),
      );
      const bVal = normalizeValue(
        getNestedValue(b as Record<string, unknown>, sortColumn.accessorKey),
      );

      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum);

      let result = 0;
      if (isNumeric) {
        result = aNum - bNum;
      } else {
        result = aVal.localeCompare(bVal);
      }
      return sortConfig.direction === "asc" ? result : -result;
    });
  }, [data, columns, sortConfig]);

  const displayedCount = processedData.length;

  return (
    <>
      <div className="mb-3 text-end">
        {/* {sortConfig && ( */}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => {
            setSortConfig(null);
          }}
        >
          Reset filters
        </button>
        {/* )} */}
      </div>
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
              {columns.map((column) => {
                const isSorted = sortConfig?.id === column.id;
                const sortable = column.sortable !== false;
                return (
                  <th key={column.id}>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 ${
                        sortable
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      }`}
                      onClick={() => handleSort(column.id, sortable)}
                    >
                      {column.header}
                      {isSorted &&
                        (sortConfig?.direction === "asc" ? (
                          <AArrowUp className="size-5" />
                        ) : (
                          <AArrowDown className="size-5" />
                        ))}
                      {!isSorted && sortable && (
                        <span className="opacity-40">
                          <MoveVertical className="size-5" />
                        </span>
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
            <tr>
              <th />
              {columns.map((column) => {
                const filterable = column.filterable !== false;
                return (
                  <th key={`${column.id}-filter`}>
                    {filterable ? (
                      <Search
                        searchBy={column.accessorKey}
                        placeholder={`Filter ${column.header}`}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading && !processedData.length ? (
              <tr className="h-52">
                <td colSpan={columns.length + 2}>
                  <div className="h-full flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg size-24" />
                  </div>
                </td>
              </tr>
            ) : !processedData.length ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              processedData.map((row, i) => (
                <tr
                  key={String(
                    (row as Record<string, unknown>)?._id ||
                      getNestedValue(
                        row as Record<string, unknown>,
                        columns[0].accessorKey,
                      ),
                  )}
                >
                  {/* select label */}
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <th>{i + 1 + (currentPage - 1) * numberOfShowingItems}</th>
                  {columns.map((column) => (
                    <td key={column.id}>
                      {column.cell
                        ? column.cell(row)
                        : String(
                            getNestedValue(
                              row as Record<string, unknown>,
                              column.accessorKey,
                            ) ?? "",
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
            {isLoading && !!processedData.length && (
              <tr>
                <td colSpan={columns.length + 2}>
                  <div className="h-full flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg size-16" />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {numberOfPages > 0 && (
        <div className="flex justify-end items-center mt-4 gap-2">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {displayedCount > numberOfAllItems
              ? numberOfAllItems
              : displayedCount}{" "}
            of {numberOfAllItems} items
          </p>
          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
        </div>
      )}
    </>
  );
}

export default Table;
