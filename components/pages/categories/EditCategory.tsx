"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ICategory } from "@/types";
import Modal from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@chakra-ui/react";
import { TCreateCategorySchema } from "@/schemas/createCategory";
import CategoryForm from "./CategoryForm";

const EditCategory = ({ category }: { category: ICategory }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // update Product function
  const UpdateProduct = async (data: TCreateCategorySchema) => {
    await axiosInstance.put(`/categories/${category?._id}`, data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update Category! try again");
    },
  });
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
        title="Update category"
        formId="updateCategoryForm"
        // classes="w-lg"
        confirmText={isPending ? "Updating..." : "Update"}
      >
        <CategoryForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="updateCategoryForm"
          initialValues={{
            name: category?.name || "",
            description: category?.description || "",
            image: category?.image || "",
          }}
        />
      </Modal>
    </>
  );
};

export default EditCategory;
