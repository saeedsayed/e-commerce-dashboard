import { ICoupon } from "@/types";
import { TColumn } from "@/components/ui/table/Table";
import { Badge, FormatNumber, Text } from "@chakra-ui/react";
import ShippingMethodTableActions from "./CouponsTableActions";
import { InfinityIcon } from "lucide-react";

export const columns: TColumn<ICoupon>[] = [
  // { id: "id", header: "id", accessorKey: "_id" },
  { id: "code", header: "Code", accessorKey: "code" },
  { id: "description", header: "Description", accessorKey: "description" },
  {
    id: "discountValue",
    header: "Discount Value",
    accessorKey: "discountValue",
    filterType: "range",
    maxRange: 999,
    cell(row: ICoupon) {
      return (
        <Text textStyle="lg">
          <FormatNumber
            value={
              row.discountType === "fixed"
                ? row.discountValue
                : row.discountValue / 100
            }
            style={row.discountType === "fixed" ? "currency" : "percent"}
            currency="USD"
          />
        </Text>
      );
    },
  },
  {
    id: "minOrderAmount",
    header: "Minimum Order Amount",
    accessorKey: "minOrderAmount",
    filterType: "range",
    maxRange: 999,
    cell(row: ICoupon) {
      return (
        <Text>
          <FormatNumber
            value={row.minOrderAmount}
            style={"currency"}
            currency="USD"
          />
        </Text>
      );
    },
  },
  {
    id: "MaximumDiscount",
    header: "Maximum discount",
    accessorKey: "maxDiscountAmount",
    filterType: "range",
    maxRange: 999,
    cell(row: ICoupon) {
      return (
        <Text>
          {!!row.maxDiscountAmount ? (
            <FormatNumber
              value={row.maxDiscountAmount}
              style={"currency"}
              currency="USD"
            />
          ) : (
            <InfinityIcon />
          )}
        </Text>
      );
    },
  },
  {
    id: "usedCount",
    header: "Used Count",
    accessorKey: "usedCount",
    filterType: "range",
  },
  {
    id: "usageLimit",
    header: "Usage Limit",
    accessorKey: "usageLimit",
    filterType: "range",
  },
  {
    id: "validFrom",
    header: "Valid From",
    accessorKey: "startDate",
    cell(row: ICoupon) {
      return (
        <Text>
          {new Date(row?.startDate.toString()).toISOString().slice(0, 10)}
        </Text>
      );
    },
  },
  {
    id: "validTo",
    header: "Valid To",
    accessorKey: "endDate",
    cell(row: ICoupon) {
      return (
        <Text>
          {new Date(row?.endDate.toString()).toISOString().slice(0, 10)}
        </Text>
      );
    },
  },
  {
    id: "isActive",
    header: "State",
    accessorKey: "isActive",
    cell(row: ICoupon) {
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
    cell: (row: ICoupon) => <ShippingMethodTableActions coupon={row} />,
  },
];
