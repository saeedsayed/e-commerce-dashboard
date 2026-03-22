import { IProduct } from "@/types";
import Image from "next/image";
import ProductTableActions from "./ProductTableActions";
import { Badge, Center, RatingGroup } from "@chakra-ui/react";
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
    rangeStep: 0.1,
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
        <Badge key={category} me={1} variant={"outline"} colorPalette={"blue"}>
          {category}
        </Badge>
      )),
  },
  {
    id: "reviews_count",
    header: "Reviews Count",
    accessorKey: "reviewsCount",
    filterable: false,
    cell: (row: IProduct) => (
      <Center>
        <Badge
          variant={"subtle"}
          colorPalette={row.reviewsCount ? "blue" : "red"}
          mx={"auto"}
        >
          {row.reviewsCount || "no Reviews"}
        </Badge>
      </Center>
    ),
  },
  {
    id: "rating",
    header: "Rating",
    accessorKey: "rating",
    filterType: "range",
    maxRange: 5,
    cell: (row: IProduct) => (
      <RatingGroup.Root
        readOnly
        count={5}
        defaultValue={row.rating}
        size="sm"
        colorPalette={"yellow"}
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
    ),
  },
  {
    id: "isActive",
    header: "State",
    accessorKey: "isActive",
    cell(row: IProduct) {
      return (
        <Badge colorPalette={row.isActive ? "green" : "red"}>
          {row.isActive ? "Activate" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "_id",
    sortable: false,
    filterable: false,
    cell: (row: IProduct) => <ProductTableActions product={row} />,
  },
];
