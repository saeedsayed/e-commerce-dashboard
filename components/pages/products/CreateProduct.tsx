"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "./ProductForm";
import { TCreateProductForm } from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import { Button } from "@chakra-ui/react";

const CreateProduct = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createProduct = async (data: TCreateProductForm) => {
    await axiosInstance.post("/products", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create product! try again");
    },
  });
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>
        Create Product <Plus />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        title="Create a new product"
        formId="createProductForm"
        classes="w-lg"
        confirmText={isPending ? "Creating..." : "Create"}
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

export default CreateProduct;
