"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {
  placeholder?: string;
  searchBy?: string;
  onSearch?: (query: string) => void;
};

const Search = (props: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();
  const current = new URLSearchParams(Array.from(params.entries()));

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      current.delete(props.searchBy || "search");
    } else if (props.searchBy) {
      current.set(props.searchBy, query);
    } else {
      current.set("search", query);
    }
    router.push(pathName + "?" + current.toString());
    props.onSearch?.(query);
  };
  return (
    <form
      className="form-control"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(
          (e.target as HTMLFormElement).querySelector("input")?.value as string,
        );
      }}
    >
      <div className="input-group">
        <input
          type="search"
          placeholder={props.placeholder || "Search..."}
          className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => props.onSearch?.(e.target.value)}
        />
        <button className="btn btn-square">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default Search;
