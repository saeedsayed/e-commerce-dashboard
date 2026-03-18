import { IShippingMethod } from "@/types";
import { TColumn } from "@/components/ui/table/Table";
import { Badge } from "@chakra-ui/react";
import ShippingMethodTableActions from "./ShippingMethodsTableActions";

export const columns: TColumn<IShippingMethod>[] = [
  { id: "id", header: "id", accessorKey: "_id" },
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "description", header: "Description", accessorKey: "description" },
  {
    id: "cost",
    header: "Cost",
    accessorKey: "cost",
    filterType: "range",
    maxRange: 999,
  },
  { id: "regions", header: "Regions", accessorKey: "regions" },
  {
    id: "isActive",
    header: "State",
    accessorKey: "isActive",
    cell(row: IShippingMethod) {
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
    cell: (row: IShippingMethod) => (
      <ShippingMethodTableActions shippingMethod={row} />
    ),
  },
];
