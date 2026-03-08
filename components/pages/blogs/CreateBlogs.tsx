"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "./BlogForm";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import { Button } from "@chakra-ui/react";
import { TCreateBlogSchema } from "@/schemas/createBlog";

const CreateBlogs = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createProduct = async (data: TCreateBlogSchema) => {
    await axiosInstance.post("/blogs", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create blog! try again");
    },
  });
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>
        Create blogs <Plus />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        title="Create a new product"
        formId="createProductForm"
        confirmText={isPending ? "Creating..." : "Create"}
        size="cover"
      >
        <CreateProductForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="createProductForm"
        />
      </Modal>
    </>
  );
};

export default CreateBlogs;
