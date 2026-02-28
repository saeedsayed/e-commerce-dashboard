"use client";
import Table from "@/components/common/Table";
import { IPagination, IProduct } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const columns = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessorKey: "thumbnail",
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
        <p className="badge badge-primary">-${row.discount}</p>
      ) : (
        <p className="badge badge-error">No Discount</p>
      ),
  },
  { id: "stock", header: "Stock", accessorKey: "stock" },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    cell: (row: IProduct) =>
      row.category.map((category) => (
        <p key={category} className="badge badge-info mx-1">
          {category}
        </p>
      )),
  },
  {
    id: "versions",
    header: "Versions",
    accessorKey: "versions.versionName",
    cell: (row: IProduct) =>
      row.versions.length ? (
        row.versions.map((version) => (
          <p key={version._id} className="badge badge-soft">
            {version?.versionName || "no versions"}
          </p>
        ))
      ) : (
        <p className="badge badge-error">No Versions</p>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "_id",
    cell: (row: IProduct) => <button className="btn btn-sm">Edit</button>,
  },
];

const ProductList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const {
        data: { data, results, paginate },
      } = await axiosInstance<{
        data: IProduct[];
        results: number;
        paginate: IPagination;
      }>(
        `/products?limit=${params.get("limit") || 50}&page=${params.get("page") || 1}&title=${params.get("title") || ""}`,
      );
      return { data, results, paginate };
    },
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <Table
        columns={columns}
        isLoading={isLoading || isRefetching}
        data={data?.data || []}
        currentPage={data?.paginate.currentPage as number}
        numberOfPages={data?.paginate.totalPages as number}
        numberOfAllItems={data?.results || 0}
        numberOfShowingItems={data?.paginate.limit as number}
      />
    </>
  );
};

export default ProductList;
