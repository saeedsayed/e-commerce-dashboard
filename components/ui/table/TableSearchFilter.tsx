"use client";
import useTableFilter from "@/hooks/useTableFilter";
import { Button, Circle, Flex, Float } from "@chakra-ui/react";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Input from "../Input";

type Props = {
  placeholder?: string;
  searchBy: string;
  //   onSearch?: (query: string) => void;
};

const TableSearchFilter = ({ searchBy, placeholder }: Props) => {
  const params = useSearchParams();
  const [inputVal, setInputVal] = useState<string>(
    params.get(`table_filter_${searchBy}`) || "",
  );
  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const { handleSearch } = useTableFilter();

  const filterIsActive = !!params.get(`table_filter_${searchBy}`);

  useEffect(() => {
    const autoSearch = (newSearchParams: {
      searchBy: string;
      query: string;
    }) => {
      timeOutId.current = setTimeout(() => {
        handleSearch([newSearchParams]);
      }, 1400);
    };

    autoSearch({ searchBy, query: inputVal });
    return () => {
      if (timeOutId.current) clearTimeout(timeOutId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal, searchBy]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch([{ searchBy, query: inputVal }]);
      }}
    >
      <Flex
        border={"1px solid"}
        borderColor={filterIsActive ? "blue.emphasized" : "border.emphasized"}
        rounded={"sm"}
        alignItems={"center"}
        position={"relative"}
        className="has-focus:border-transparent has-focus:ring-2"
      >
        {filterIsActive && (
          <Float zIndex={9}>
            <Circle size="3" bg="blue.emphasized" />
          </Float>
        )}
        <Input
          type="search"
          name="search"
          value={inputVal}
          border={"none"}
          h={8}
          minW={24}
          _focus={{ outline: "none" }}
          placeholder={placeholder || "Search..."}
          onChange={(e) => setInputVal(e.target.value)}
        />
        {filterIsActive && (
          <Button
            variant={"ghost"}
            size={"xs"}
            type="button"
            onClick={() => setInputVal("")}
          >
            <XIcon />
          </Button>
        )}
        <Button variant={"ghost"} size={"xs"}>
          <SearchIcon />
        </Button>
      </Flex>
    </form>
  );
};

export default TableSearchFilter;
