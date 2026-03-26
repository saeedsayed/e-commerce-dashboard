"use client";
import Table from "@/components/ui/table/Table";
import { IArticle, IPagination } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./BlogsTableColumns";

const BlogsList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const {
        data: { data: blogs, results, paginate },
      } = await axiosInstance<{
        data: IArticle[];
        results: number;
        paginate: IPagination;
      }>(`/blogs`);
      return { blogs, results, paginate };
    },
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <Table
        columns={columns}
        isLoading={isLoading}
        isRefresh={isRefetching}
        data={data?.blogs || []}
        currentPage={data?.paginate?.currentPage || 1}
        pagesCount={data?.paginate?.totalPages || 1}
        numberOfAllItems={data?.results || 0}
        pageSize={data?.paginate?.limit || 0}
        showRefreshBtn
        queryKeys={["blogs"]}
      />
    </>
  );
};

export default BlogsList;
