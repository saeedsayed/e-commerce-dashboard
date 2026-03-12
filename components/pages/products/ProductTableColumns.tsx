import { IProduct } from "@/types";
import Image from "next/image";
import ProductTableActions from "./ProductTableActions";
import { Badge } from "@chakra-ui/react";
import { TColumn } from "@/components/ui/table/Table";

export const columns: TColumn<IProduct>[] = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessorKey: "thumbnail",
    sortable: false,
    filterable: false,
    cell: (row: IProduct) => (
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
    id: "price",
    header: "price",
    accessorKey: "price",
    filterType: "range",
    maxRange: 9999,
    rangeStep:0.1,
    cell: (row: IProduct) => (
      <p>
        ${row.price - row.discount}{" "}
        {row.discount > 0 && (
          <span className="line-through opacity-70">${row.price}</span>
        )}
      </p>
    ),
  },
  {
    id: "discount",
    header: "Discount",
    accessorKey: "discount",
    filterType: "range",
    maxRange: 999,
    cell: (row: IProduct) =>
      row.discount > 0 ? (
        <Badge colorPalette={"cyan"}>-${row.discount}</Badge>
      ) : (
        <Badge colorPalette={"blue"}>No Discount</Badge>
      ),
  },
  {
    id: "stock",
    header: "Stock",
    accessorKey: "stock",
    filterType: "range",
    maxRange: 999,
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    cell: (row: IProduct) =>
      row.category.map((category) => (
        <p key={category} className="badge badge-info mx-1 badge-xs">
          {category}
        </p>
      )),
  },
  {
    id: "versions",
    header: "Versions",
    accessorKey: "versions.versionName",
    filterable: false,
    cell: (row: IProduct) =>
      row.versions.length ? (
        row.versions.map((version) => (
          <Badge key={version.versionName} colorPalette={"green"}>
            {version?.versionName || "no versions"}
          </Badge>
        ))
      ) : (
        <Badge colorPalette={"blue"}>No Versions</Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "_id",
    sortable: false,
    filterable: false,
    cell: (row: IProduct) => <ProductTableActions productId={row._id} />,
  },
];
