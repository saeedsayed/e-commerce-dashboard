"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button, Flex, Input } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

type Props = {
  placeholder?: string;
  searchBy: string;
  onSearch?: (query: string) => void;
};

const Search = ({ searchBy, onSearch, placeholder }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();
  const [inputVal, setInputVal] = useState<string>(params.get(searchBy) || "");
  const timeOutId = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (value: string) => {
    setInputVal(value);
    onSearch?.(value);
  };

  const handleSearch = useCallback(
    (query: string) => {
      const current = new URLSearchParams(Array.from(params.entries()));
      if (
        (!query.trim() && !params.get(searchBy)) ||
        query.trim() === params.get(searchBy)
      )
        return;
      if (!query.trim() && !!params.get(searchBy)) {
        current.delete(searchBy || "search");
      } else if (!!query.trim()) {
        current.set(searchBy, query);
      }
      router.push(pathName + "?" + current.toString());
      onSearch?.(query);
    },
    [searchBy, params, pathName, onSearch, router],
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
    </form>
  );
};

export default Search;
