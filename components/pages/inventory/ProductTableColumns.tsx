import { IProduct } from "@/types";
import Image from "next/image";
import ProductTableActions from "./ProductTableActions";

export const columns = [
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
        className="w-16 h-16 object-cover rounded"
      />
    ),
  },
  { id: "name", header: "Name", accessorKey: "title" },
  {
    id: "price",
    header: "price",
    accessorKey: "price",
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
    cell: (row: IProduct) =>
      row.discount > 0 ? (
        <p className="badge badge-primary badge-xs">-${row.discount}</p>
      ) : (
        <p className="badge badge-warning badge-xs">No Discount</p>
      ),
  },
  { id: "stock", header: "Stock", accessorKey: "stock" },
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
          <p key={version._id} className="badge badge-soft">
            {version?.versionName || "no versions"}
          </p>
        ))
      ) : (
        <p className="badge badge-warning badge-xs">No Versions</p>
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
