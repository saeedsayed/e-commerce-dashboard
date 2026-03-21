"use client";
import { Box, Button, Circle, Float, Menu, Portal } from "@chakra-ui/react";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import RangeSlider from "../RangeSlider";
import useTableFilter from "@/hooks/useTableFilter";
import { useState } from "react";

type Props = {
  filterBy: string;
  minRangePlaceholder?: string;
  maxRangePlaceholder?: string;
  maxRange?: number;
  step?: number;
  //   onFilter?: (query: string) => void;
};

const TableRangeFilter = ({
  filterBy,
  minRangePlaceholder,
  maxRangePlaceholder,
  maxRange,
  step,
}: Props) => {
  const params = useSearchParams();
  const [rangeValues, setRangeValues] = useState<number[]>([
    0,
    maxRange || 100,
  ]);
  const filterIsActive =
    !!params.get(`table_filter_max${filterBy}`) || !!params.get(`table_filter_min${filterBy}`);
  const { handleSearch: search } = useTableFilter();
  const handleSearch = (searchValues: number[]) => {
    search([
      {
        searchBy: `min${filterBy}`,
        query: searchValues[0] === 0 ? "" : `${searchValues[0]}`,
      },
      {
        searchBy: `max${filterBy}`,
        query: searchValues[1] === maxRange ? "" : `${searchValues[1]}`,
      },
    ]);
  };
  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          bg={filterIsActive ? "blue.muted" : ""}
        >
          <FilterIcon />
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
          onClick={() => handleSearch([0, maxRange || 100])}
        >
          <XIcon />
        </Button>
      )}
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <RangeSlider
              minValLabel={minRangePlaceholder}
              maxValLabel={maxRangePlaceholder}
              maxVal={maxRange}
              onRangeChangeEnd={(v) => handleSearch(v as number[])}
              onChange={(v) => setRangeValues(v as number[])}
              defaultValue={[
                Number(params.get(`table_filter_min${filterBy}`)) || 0,
                Number(params.get(`table_filter_max${filterBy}`)) || maxRange || 100,
              ]}
              step={step}
              //   onMouseUp={(v) => handleSearch(v as number[])}
            />
            <Box textAlign={"end"} mt={2} px={4}>
              <Button
                size={"xs"}
                variant={"outline"}
                onClick={() => handleSearch(rangeValues)}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default TableRangeFilter;
