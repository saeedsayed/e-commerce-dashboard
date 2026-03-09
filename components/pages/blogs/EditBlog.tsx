"use client";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IArticle } from "@/types";
import Modal from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/tooltip";
import { AbsoluteCenter, Box, Button, Spinner } from "@chakra-ui/react";
import ProductForm from "./BlogForm";
import { TCreateBlogSchema } from "@/schemas/createBlog";

const EditBlog = ({ blogId }: { blogId: string }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  //   get target product
  const getTargetBlog = async () => {
    const {
      data: { data: blog },
    } = await axiosInstance.get<{ data: IArticle }>(`/blogs/${blogId}`);
    return blog;
  };
  const {
    data: blog,
    mutate: getBlog,
    isPending: isGetProduct,
  } = useMutation({
    mutationFn: getTargetBlog,
  });

  // update Product function
  const UpdateProduct = async (data: TCreateBlogSchema) => {
    await axiosInstance.put(`/blogs/${blogId}`, data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update blog! try again");
    },
  });

  //   get initial values after open modal
  useEffect(() => {
    if (blogId && modalIsOpen) {
      getBlog();
    }
  }, [blogId, modalIsOpen, getBlog]);
  return (
    <>
      <Tooltip content="Edit" showArrow>
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
          size={"xs"}
          variant={"outline"}
          borderColor={"blue.border"}
          color={"blue.border"}
        >
          <Edit className="size-4" />
        </Button>
      </Tooltip>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onConfirm={() => {}}
        title="Update a new product"
        formId="updateProductForm"
        size="cover"
        confirmText={isPending ? "Updating..." : "Update"}
      >
        {isGetProduct ? (
          <Box height={80}>
            <AbsoluteCenter>
              <Spinner size={"xl"} />
            </AbsoluteCenter>
          </Box>
        ) : (
          <ProductForm
            onSubmit={(data) => mutate(data)}
            isSubmitting={isPending}
            formId="updateProductForm"
            initialValues={{
              title: blog?.title || "",
              thumbnail: blog?.thumbnail || "",
              content: blog?.content || "",
              tags: blog?.tags || [],
              author: blog?.author || "",
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default EditBlog;
