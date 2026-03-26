"use client";
import { Box, Button } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
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
  const { handleFilter: search } = useTableFilter();
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
    <>
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
    </>
  );
};

export default TableRangeFilter;
