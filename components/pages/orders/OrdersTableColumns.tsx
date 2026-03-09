import { IOrder } from "@/types";
import { TColumn } from "@/components/ui/Table";
import { HStack, TagLabel, TagRoot, Text } from "@chakra-ui/react";

export const columns: TColumn<IOrder>[] = [
  {
    id: "OrderID",
    header: "Order ID",
    accessorKey: "_id",
    sortable: false,
  },
  {
    id: "orderDate",
    header: "Order Date",
    accessorKey: "createdAT",
    cell(row) {
      return (
        <Text>
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      );
    },
  },
  {
    id: "customer",
    header: "Customer",
    accessorKey: "user.fullName",
    sortable: false,
  },
  {
    id: "total",
    header: "Total",
    accessorKey: "pricing.total",
    filterable: false,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
  },
  {
    id: "items",
    header: "Items",
    accessorKey: "Items",
    filterable: false,
    sortable: false,
    cell(row) {
      return (
        <HStack>
          {row.items.map((item) => (
            <TagRoot key={item.product._id}>
              <TagLabel>
                ({item.quantity}) {item.product.title}
              </TagLabel>
            </TagRoot>
          ))}
        </HStack>
      );
    },
  },
  {
    id: "shippingMethod",
    header: "Shipping Method",
    accessorKey: "shippingMethod.name",
    filterable: false,
    sortable: false,
  },
  {
    id: "paymentMethod",
    header: "Payment Method",
    accessorKey: "paymentDetails.method",
    filterable: false,
    sortable: false,
  },
];
