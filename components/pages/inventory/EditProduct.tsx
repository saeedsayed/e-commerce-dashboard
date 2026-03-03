"use client";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProductForm from "./ProductForm";
import { TCreateProductForm } from "@/schemas/createProduct";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import Modal from "@/components/common/Modal";

const EditProduct = ({ productId }: { productId: string }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  //   get target product
  const getTargetProduct = async () => {
    const {
      data: { data: product },
    } = await axiosInstance.get<{ data: IProduct }>(`/products/${productId}`);
    return product;
  };
  const {
    data: product,
    mutate: getProduct,
    isPending: isGetProduct,
  } = useMutation({
    mutationFn: getTargetProduct,
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
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update product! try again");
    },
  });

  //   get initial values after open modal
  useEffect(() => {
    if (productId && modalIsOpen) {
      getProduct();
    }
  }, [productId, modalIsOpen, getProduct]);
  return (
    <>
      <button
        className="btn btn-xs btn-info text-base-content"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Edit <Edit className="size-4" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onConfirm={() => {}}
        title="Update a new product"
        formId="updateProductForm"
        classes="w-md"
        confirmText={isPending ? "Updating..." : "Update"}
      >
        {isGetProduct ? (
          <div className="h-80 w-full flex items-center justify-center">
            <div className="loading loading-spinner size-24"></div>
          </div>
        ) : (
          <CreateProductForm
            onSubmit={(data) => mutate(data)}
            isSubmitting={isPending}
            formId="updateProductForm"
            initialValues={{
              title: product?.title || "",
              discount: product?.discount,
              price: product?.price || 0,
              description: product?.description || "",
              thumbnail: product?.thumbnail || "",
              category: product?.category || [],
              stock: product?.stock || 0,
              images: product?.images
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default EditProduct;
