import { HStack, Span, Spinner, Switch } from "@chakra-ui/react";

import { IShippingMethod } from "@/types";
import EditShippingMethod from "./EditShippingMethod";
import { Tooltip } from "@/components/ui/tooltip";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ShippingMethodTableActions = ({
  shippingMethod,
}: {
  shippingMethod: IShippingMethod;
}) => {
  const queryClient = useQueryClient();
  const updateShippingMethodStatus = async (newStatus: boolean) => {
    await axiosInstance.put(`/shipping/${shippingMethod._id}`, {
      isActive: newStatus,
    });
  };
  const { mutate: handleStatusSwitch, isPending } = useMutation({
    mutationFn: updateShippingMethodStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Shipping method deleted successfully");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to delete shipping method! try again");
    },
  });
  return (
    <>
      <HStack gap={2}>
        <EditShippingMethod shippingMethod={shippingMethod} />
        <Tooltip content="Switch Status" showArrow>
          <Span>
            <Switch.Root
              checked={shippingMethod.isActive}
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

export default ShippingMethodTableActions;
