"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import { Button } from "@chakra-ui/react";
import { TCreateCategorySchema } from "@/schemas/createCategory";
import CategoryForm from "./CategoryForm";

const CreateCategory = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createProduct = async (data: TCreateCategorySchema) => {
    await axiosInstance.post("/categories", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create category! try again");
    },
  });
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>
        Create category <Plus />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        title="Create a new category"
        formId="createCategoryForm"
        classes="w-lg"
        confirmText={isPending ? "Creating..." : "Create"}
      >
        <CategoryForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="createCategoryForm"
        />
      </Modal>
    </>
  );
};

export default CreateCategory;
