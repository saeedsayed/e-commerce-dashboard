"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IShippingMethod } from "@/types";
import Modal from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@chakra-ui/react";
import CategoryForm from "./ShippingMethodForm";
import { TCreateShippingMethodSchema } from "@/schemas/createShippingMethod";

const EditShippingMethod = ({
  shippingMethod,
}: {
  shippingMethod: IShippingMethod;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // update Product function
  const UpdateProduct = async (data: TCreateShippingMethodSchema) => {
    await axiosInstance.put(`/shipping/${shippingMethod?._id}`, data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Shipping method updated successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to update shipping method! try again");
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
        title="Update a new product"
        formId="updateProductForm"
        // classes="w-lg"
        confirmText={isPending ? "Updating..." : "Update"}
      >
        <CategoryForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="updateProductForm"
          initialValues={{
            name: shippingMethod?.name || "",
            description: shippingMethod?.description || "",
            cost: shippingMethod?.cost || 0,
            estimatedDeliveryDays: shippingMethod?.estimatedDeliveryDays || 0,
            regions: shippingMethod?.regions || [],
          }}
        />
      </Modal>
    </>
  );
};

export default EditShippingMethod;
