import { IArticle } from "@/types";
import Image from "next/image";
import ProductTableActions from "./BlogsTableActions";
import { TColumn } from "@/components/ui/table/Table";
import { HStack, Tag } from "@chakra-ui/react";

export const columns: TColumn<IArticle>[] = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessorKey: "thumbnail",
    sortable: false,
    filterable: false,
    cell: (row: IArticle) => (
      <Image
        src={row.thumbnail}
        alt={row.title}
        width={100}
        height={100}
        className="w-16 h-16! object-cover rounded"
      />
    ),
  },
  { id: "name", header: "Name", accessorKey: "title" },
  { id: "author", header: "author", accessorKey: "author" },
  {
    id: "tags",
    header: "tags",
    accessorKey: "tags",
    sortable: false,
    filterable: false,
    cell: (row: IArticle) => (
      <HStack>
        {!row.tags?.length ? (
          <Tag.Root colorPalette={"red"}>
            <Tag.Label>No Tags</Tag.Label>
          </Tag.Root>
        ) : (
          row.tags.map((tag) => (
            <Tag.Root key={tag}>
              <Tag.Label>{tag}</Tag.Label>
            </Tag.Root>
          ))
        )}
      </HStack>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "_id",
    sortable: false,
    filterable: false,
    cell: (row: IArticle) => <ProductTableActions blogId={row._id} />,
  },
];
