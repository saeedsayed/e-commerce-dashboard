"use client";
import TableSearchFilter from "./TableSearchFilter";
import TableRangeFilter from "./TableRangeFilter";
import { Button, Circle, Float, Menu, Portal } from "@chakra-ui/react";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import useTableFilter from "@/hooks/useTableFilter";

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
  const { activeFilters, removeFilter } = useTableFilter();
  const MenuButtonIcon =
    filterType === "text" ? <SearchIcon /> : <FilterIcon />;
  const filterIsActive = activeFilters.includes(filterBy);

  return (
    <>
      <Menu.Root positioning={{ placement: "bottom" }}>
        <Menu.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            bg={filterIsActive ? "blue.muted" : ""}
          >
            {MenuButtonIcon}
            {filterIsActive && (
              <Float>
                <Circle size="3" bg="blue.emphasized" />
              </Float>
            )}
          </Button>
        </Menu.Trigger>
        {filterIsActive && (
          <Button
            ms={2}
            size={"sm"}
            variant={"outline"}
            onClick={() => removeFilter(filterBy)}
          >
            <XIcon />
          </Button>
        )}
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
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
                <TableSearchFilter
                  searchBy={filterBy}
                  placeholder={placeholder}
                />
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default TableFilter;
