"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  TCreateProductForm,
} from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateProduct = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const formController = useForm({
    resolver: zodResolver(createProductSchema),
  });
  const createProduct = async (data: TCreateProductForm) => {
    await axiosInstance.post("/products", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      setModalIsOpen(false);
      formController.reset();
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create product! try again");
    },
  });
  return (
    <>
      <button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>
        Create Product <Plus />
      </button>
      <CreateProductForm
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        onSubmit={(data) => mutate(data)}
        isSubmitting={isPending}
        formController={formController}
      />
    </>
  );
};

export default CreateProduct;
