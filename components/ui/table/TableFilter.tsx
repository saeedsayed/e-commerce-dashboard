"use client";
import TableSearchFilter from "./TableSearchFilter";
import TableRangeFilter from "./TableRangeFilter";

type Props = {
  placeholder?: string;
  minRangePlaceholder?: string;
  maxRangePlaceholder?: string;
  maxRange?: number;
  filterBy: string;
  filterType?: "text" | "range" | "date";
  rangeStep?: number;
};

const TableFilter = ({
  filterBy,
  minRangePlaceholder,
  maxRangePlaceholder,
  maxRange,
  placeholder,
  filterType = "text",
  rangeStep,
}: Props) => {
  return (
    <>
      {filterType === "range" && (
        <TableRangeFilter
          filterBy={filterBy}
          minRangePlaceholder={minRangePlaceholder}
          maxRangePlaceholder={maxRangePlaceholder}
          maxRange={maxRange}
          step={rangeStep}
        />
      )}
      {filterType === "text" && (
        <TableSearchFilter searchBy={filterBy} placeholder={placeholder} />
      )}
    </>
  );
};

export default TableFilter;
