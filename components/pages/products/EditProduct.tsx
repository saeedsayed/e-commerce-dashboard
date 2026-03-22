"use client";
import { TCreateProductForm } from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import { useRouter } from "@/i18n/navigation";

const EditProduct = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  //   get target product
  const getTargetProduct = async () => {
    const {
      data: { data: product },
    } = await axiosInstance.get<{ data: IProduct }>(`/products/${productId}`);
    return product;
  };
  const { data: product, isPending: isGetProduct } = useQuery({
    queryKey: ["single_product", productId],
    queryFn: getTargetProduct,
  });

  // update Product function
  const UpdateProduct = async (data: TCreateProductForm) => {
    await axiosInstance.put(`/products/${productId}`, data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      router.push(`/products/${productId}`);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update product! try again");
    },
  });
  return (
    <>
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
      )}
    </>
  );
};

export default EditProduct;
