"use client";

import React, { useMemo, useState } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import { AArrowDown, AArrowUp, MoveVertical } from "lucide-react";
import { Box, Button, Center, Table as ChakraTable, Spinner } from "@chakra-ui/react";

export type TColumn<T> = {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
};

type Props<T = Record<string, unknown>> = {
  columns: TColumn<T>[];
  data: T[];
  numberOfAllItems: number;
  pageSize: number;
  pagesCount: number;
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
  pageSize,
  pagesCount,
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
  return (
    <Box position={"relative"}>
      <div className="mb-3 text-end">
        {/* {sortConfig && ( */}
        <Button
          type="button"
          size={"xs"}
          variant={"outline"}
          onClick={() => {
            setSortConfig(null);
          }}
        >
          Reset filters
        </Button>
        {/* )} */}
      </div>
      {isLoading && (
        <Box pos="absolute" inset="0" bg="bg/80" zIndex={10}>
          <Center h="full">
            <Spinner size={"xl"} borderWidth={4} />
          </Center>
        </Box>
      )}
      <ChakraTable.ScrollArea rounded="md" height="calc(100vh - 16rem)" my={4}>
        <ChakraTable.Root striped stickyHeader>
          {/* head */}
          <ChakraTable.Header>
            <ChakraTable.Row>
              {/* select label */}
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <ChakraTable.ColumnHeader>#</ChakraTable.ColumnHeader>
              {columns.map((column) => {
                const isSorted = sortConfig?.id === column.id;
                const sortable = column.sortable !== false;
                return (
                  <ChakraTable.ColumnHeader key={column.id}>
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
                  </ChakraTable.ColumnHeader>
                );
              })}
            </ChakraTable.Row>
            <ChakraTable.Row>
              <ChakraTable.ColumnHeader />
              {columns.map((column) => {
                const filterable = column.filterable !== false;
                return (
                  <ChakraTable.ColumnHeader key={`${column.id}-filter`}>
                    {filterable ? (
                      <Search
                        searchBy={column.accessorKey}
                        placeholder={`Filter ${column.header}`}
                      />
                    ) : null}
                  </ChakraTable.ColumnHeader>
                );
              })}
            </ChakraTable.Row>
          </ChakraTable.Header>
          <ChakraTable.Body>
            {!processedData.length ? (
              <ChakraTable.Row>
                <ChakraTable.Cell
                  colSpan={columns.length + 2}
                  className="text-center"
                >
                  No data available
                </ChakraTable.Cell>
              </ChakraTable.Row>
            ) : (
              processedData.map((row, i) => (
                <ChakraTable.Row
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
                  <ChakraTable.ColumnHeader>
                    {i + 1 + (currentPage - 1) * pageSize}
                  </ChakraTable.ColumnHeader>
                  {columns.map((column) => (
                    <ChakraTable.Cell key={column.id}>
                      {column.cell
                        ? column.cell(row)
                        : String(
                            getNestedValue(
                              row as Record<string, unknown>,
                              column.accessorKey,
                            ) ?? "",
                          )}
                    </ChakraTable.Cell>
                  ))}
                </ChakraTable.Row>
              ))
            )}
          </ChakraTable.Body>
        </ChakraTable.Root>
      </ChakraTable.ScrollArea>
      {/* </Box> */}
      {pagesCount > 0 && (
        <div className="flex justify-end items-center mt-4 gap-2">
          <p className="text-sm text-gray-500">
            {pageSize * (currentPage - 1) + 1} –
            {pageSize * currentPage > numberOfAllItems
              ? numberOfAllItems
              : pageSize * currentPage}{" "}
            of {numberOfAllItems} items
          </p>
          <Pagination currentPage={currentPage} pagesCount={pagesCount} />
        </div>
      )}
    </Box>
  );
}

export default Table;
