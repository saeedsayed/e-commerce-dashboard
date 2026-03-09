"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button, Flex, Input, Menu, Portal } from "@chakra-ui/react";
import { Filter, SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import RangeSlider from "./RangeSlider";

type Props = {
  placeholder?: string;
  filterBy: string;
  onFilter?: (query: string) => void;
  filterType?: "text" | "range" | "date";
};

const TableFilter = ({
  filterBy,
  onFilter,
  placeholder,
  filterType = "text",
}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();
  const [inputVal, setInputVal] = useState<string>(params.get(filterBy) || "");
  const timeOutId = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (value: string) => {
    setInputVal(value);
    onFilter?.(value);
  };

  const handleSearch = useCallback(
    (query: string) => {
      const current = new URLSearchParams(Array.from(params.entries()));
      if (
        (!query.trim() && !params.get(filterBy)) ||
        query.trim() === params.get(filterBy)
      )
        return;
      if (!query.trim() && !!params.get(filterBy)) {
        current.delete(filterBy || "search");
      } else if (!!query.trim()) {
        current.set(filterBy, query);
      }
      router.push(pathName + "?" + current.toString());
      onFilter?.(query);
    },
    [filterBy, params, pathName, onFilter, router],
  );

  useEffect(() => {
    const autoSearch = (query: string) => {
      timeOutId.current = setTimeout(() => {
        handleSearch(query);
      }, 1400);
    };

    autoSearch(inputVal);
    return () => {
      if (timeOutId.current) clearTimeout(timeOutId.current);
    };
  }, [inputVal, handleSearch]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(inputVal);
      }}
    >
      {filterType === "range" && (
        <Menu.Root positioning={{ placement: "bottom" }}>
          <Menu.Trigger asChild>
            <Button variant="outline" size="sm">
              <Filter />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW={56}>
                <RangeSlider />
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
      {filterType === "text" && (
        <Flex
          border={"1px solid"}
          borderColor={"border.emphasized"}
          rounded={"sm"}
          alignItems={"center"}
          className="has-focus:border-transparent has-focus:ring-2"
        >
          <Input
            type="search"
            name="search"
            value={inputVal}
            border={"none"}
            h={8}
            _focus={{ outline: "none" }}
            placeholder={placeholder || "Search..."}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button variant={"ghost"} size={"xs"}>
            <SearchIcon />
          </Button>
        </Flex>
      )}
    </form>
  );
};

export default TableFilter;
