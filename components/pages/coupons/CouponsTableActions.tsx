import { HStack, Span, Spinner, Switch } from "@chakra-ui/react";

import { ICoupon } from "@/types";
import EditCoupon from "./EditCoupon";
import { Tooltip } from "@/components/ui/tooltip";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CouponsTableActions = ({ coupon }: { coupon: ICoupon }) => {
  const queryClient = useQueryClient();
  const updateCouponStatus = async (newStatus: boolean) => {
    await axiosInstance.put(`/coupon/${coupon._id}`, {
      isActive: newStatus,
    });
  };
  const { mutate: handleStatusSwitch, isPending } = useMutation({
    mutationFn: updateCouponStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupon"] });
      toast.success("Coupon status updated successfully");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to updated coupon status! try again");
    },
  });
  return (
    <>
      <HStack gap={2}>
        <EditCoupon coupon={coupon} />
        <Tooltip content="Switch Status" showArrow>
          <Span>
            <Switch.Root
              checked={coupon.isActive}
              onCheckedChange={(e) => handleStatusSwitch(e.checked)}
            >
              <Switch.HiddenInput />
              {isPending ? <Spinner /> : <Switch.Control />}
            </Switch.Root>
          </Span>
        </Tooltip>
      </HStack>
    </>
  );
};

export default CouponsTableActions;
