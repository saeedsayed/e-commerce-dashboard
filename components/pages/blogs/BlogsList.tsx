"use client";
import Table from "@/components/ui/Table";
import { IArticle } from "@/types";
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
        data: { data: blogs },
      } = await axiosInstance<{
        data: IArticle[];
      }>(`/blogs?${params.toString()}`);
      return { blogs };
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
        currentPage={1}
        pagesCount={1}
        numberOfAllItems={data?.blogs.length || 0}
        pageSize={data?.blogs?.length || 0}
        showRefreshBtn
        queryKeys={["blogs"]}
      />
    </>
  );
};

export default BlogsList;
