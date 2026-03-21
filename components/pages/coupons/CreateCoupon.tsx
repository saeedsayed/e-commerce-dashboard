"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import { Button } from "@chakra-ui/react";
import { TCreateCouponSchema } from "@/schemas/createCoupon";
import CouponForm from "./CouponForm";
import { AxiosError } from "axios";

export type TCreateCouponBody = TCreateCouponSchema & {
  startDate: string;
  endDate: string;
};

const CreateCoupon = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createNewCoupon = async (data: TCreateCouponBody) => {
    try {
      await axiosInstance.post("/coupon", data);
    } catch (err) {
      const error = err as AxiosError;
      throw error?.response?.data || err;
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateCouponSchema) => {
      const body = {
        ...data,
        startDate: data.expiryDateRange[0],
        endDate: data.expiryDateRange[1],
      };
      return createNewCoupon(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupon"] });
      toast.success("coupon created successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "failed to create coupon! try again");
    },
  });
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>
        Create New Coupon <Plus />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onConfirm={() => {}}
        title="Create a new coupon"
        formId="createCouponForm"
        classes="w-lg"
        confirmText={isPending ? "Creating..." : "Create"}
      >
        <CouponForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="createCouponForm"
        />
      </Modal>
    </>
  );
};

export default CreateCoupon;
