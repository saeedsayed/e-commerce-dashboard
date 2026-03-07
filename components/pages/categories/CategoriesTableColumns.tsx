import { ICategory } from "@/types";
import Image from "next/image";
import { TColumn } from "@/components/common/Table";
import CategoriesTableActions from "./CategoriesTableActions";

export const columns: TColumn<ICategory>[] = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessorKey: "thumbnail",
    sortable: false,
    filterable: false,
    cell: (row: ICategory) => (
      <Image
        src={row.image}
        alt={row.name}
        width={100}
        height={100}
        className="w-16 h-16! object-cover rounded"
      />
    ),
  },
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "description", header: "description", accessorKey: "description" },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "_id",
    sortable: false,
    filterable: false,
    cell: (row: ICategory) => <CategoriesTableActions category={row} />,
  },
];
