import { IArticle } from "@/types";
import Image from "next/image";
import ProductTableActions from "./BlogsTableActions";
import { TColumn } from "@/components/common/Table";
import { Box } from "@chakra-ui/react";

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
  {
    id: "body",
    header: "body",
    accessorKey: "content",
    sortable: false,
    filterable: false,
    cell: (row: IArticle) => (
      <Box truncate w={700} dangerouslySetInnerHTML={{ __html: row.content }} maxH={"100px"} overflow={"auto"} />
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
