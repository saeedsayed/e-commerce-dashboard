"use client";
import { TCreateProductForm } from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";
import { useRouter } from "@/i18n/navigation";

const CreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createProduct = async (data: TCreateProductForm) => {
    await axiosInstance.post("/products", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      router.push("/products");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create product! try again");
    },
  });
  return (
    <>
      <ProductForm onSubmit={(data) => mutate(data)} isSubmitting={isPending} />
    </>
  );
};

export default CreateProduct;
