import { usePathname, useRouter } from "@/i18n/navigation";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Pagination as ChakraPagination } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  currentPage: number;
  pagesCount: number;
  onPageChange?: (page: number) => void;
};

const Pagination = ({ currentPage, pagesCount, onPageChange }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  const current = new URLSearchParams(Array.from(params.entries()));

  const handlePageChange = (page: number) => {
    current.set("page", String(page));
    router.push(`${pathName}?${current.toString()}`);
    onPageChange?.(page);
  };

  return (
    <>
      <ChakraPagination.Root
        count={pagesCount}
        pageSize={1}
        defaultPage={currentPage}
        onPageChange={(e) => handlePageChange(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm">
          <ChakraPagination.PrevTrigger asChild>
            <IconButton>
              <ArrowLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger asChild>
            <IconButton>
              <ArrowRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </ChakraPagination.Root>
    </>
  );
};

export default Pagination;
