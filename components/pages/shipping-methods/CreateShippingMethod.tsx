"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import { Button } from "@chakra-ui/react";
import { TCreateShippingMethodSchema } from "@/schemas/createShippingMethod";
import ShippingMethodForm from "./ShippingMethodForm";

const CreateShippingMethod = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createShippingMethod = async (data: TCreateShippingMethodSchema) => {
    await axiosInstance.post("/shipping", data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createShippingMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Shipping method created successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create shipping method! try again");
    },
  });
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>
        Create shipping method <Plus />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onConfirm={() => {}}
        title="Create a new shipping method"
        formId="createShippingMethodForm"
        classes="w-lg"
        confirmText={isPending ? "Creating..." : "Create"}
      >
        <ShippingMethodForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="createShippingMethodForm"
        />
      </Modal>
    </>
  );
};

export default CreateShippingMethod;
