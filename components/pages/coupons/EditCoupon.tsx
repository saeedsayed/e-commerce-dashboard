"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ICoupon } from "@/types";
import Modal from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@chakra-ui/react";
import CouponForm from "./CouponForm";
import { TCreateCouponSchema } from "@/schemas/createCoupon";
import { TCreateCouponBody } from "./CreateCoupon";
import { AxiosError } from "axios";

const EditCoupon = ({ coupon }: { coupon: ICoupon }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // update Product function
  const UpdateProduct = async (data: TCreateCouponBody) => {
    try {
      await axiosInstance.put(`/coupon/${coupon?._id}`, data);
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
      return UpdateProduct(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupon"] });
      toast.success("Coupon updated successfully");
      setModalIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "failed to update coupon! try again");
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
        title="Update coupon"
        formId="updateCouponForm"
        // classes="w-lg"
        confirmText={isPending ? "Updating..." : "Update"}
      >
        <CouponForm
          onSubmit={(data) => mutate(data)}
          isSubmitting={isPending}
          formId="updateCouponForm"
          initialValues={{
            code: coupon?.code,
            description: coupon?.description,
            discountValue: coupon?.discountValue,
            discountType: coupon?.discountType,
            minOrderAmount: coupon?.minOrderAmount,
            maxDiscountAmount: coupon?.maxDiscountAmount,
            expiryDateRange: (() => {
              return [
                new Date(coupon?.startDate.toString())
                  .toISOString()
                  .slice(0, 10),
                new Date(coupon?.endDate.toString()).toISOString().slice(0, 10),
              ];
            })(),
            usageLimit: coupon?.usageLimit,
          }}
        />
      </Modal>
    </>
  );
};

export default EditCoupon;
