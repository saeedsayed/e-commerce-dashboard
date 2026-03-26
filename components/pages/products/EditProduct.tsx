"use client";
import { TCreateProductForm } from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import ProductForm from "./ProductForm";
import { useRouter } from "@/i18n/navigation";

const EditProduct = ({ product }: { product: IProduct }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // update Product function
  const UpdateProduct = async (data: TCreateProductForm) => {
    await axiosInstance.put(`/products/${product._id}`, data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully");
      router.push(`/products/${product._id}`);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update product! try again");
    },
  });
  return (
    <>
      <ProductForm
        onSubmit={(data) => mutate(data)}
        onCancel={()=>router.back()}
        isSubmitting={isPending}
        initialValues={{
          title: product?.title || "",
          discount: product?.discount,
          price: product?.price || 0,
          cost: product?.cost || 0,
          description: product?.description || "",
          thumbnail: product?.thumbnail || "",
          category: product?.category || [],
          stock: product?.stock || 0,
          images: product?.images,
          sizes: product?.sizes,
          weight: product?.weight,
          dimensions: {
            length: product?.dimensions?.length,
            width: product?.dimensions?.width,
            height: product?.dimensions?.height,
            depth: product?.dimensions?.depth,
          },
        }}
      />
    </>
  );
};

export default EditProduct;
