import { Edit, EyeIcon } from "lucide-react";
import { Button, HStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Link } from "@/i18n/navigation";
import { IProduct } from "@/types";

const ProductTableActions = ({ product }: { product: IProduct }) => {
  // const queryClient = useQueryClient();
  // const updateShippingMethodStatus = async (newStatus: boolean) => {
  //   await axiosInstance.put(`/shipping/${shippingMethod._id}`, {
  //     isActive: newStatus,
  //   });
  // };
  // const { mutate: handleStatusSwitch, isPending } = useMutation({
  //   mutationFn: updateShippingMethodStatus,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["shipping"] });
  //     toast.success("Shipping method deleted successfully");
  //   },
  //   onError: (err) => {
  //     console.log("err", err);
  //     toast.error("failed to delete shipping method! try again");
  //   },
  // });
  return (
    <>
      <HStack gap={2}>
        <Tooltip content="View Detail" showArrow>
          <Link href={`products/${product._id}`}>
            <Button
              size={"xs"}
              variant={"outline"}
              borderColor={"green.border"}
              color={"green.border"}
            >
              <EyeIcon className="size-4" />
            </Button>
          </Link>
        </Tooltip>
        <Tooltip content="Edit" showArrow>
          <Link href={`products/edit/${product._id}`}>
            <Button
              size={"xs"}
              variant={"outline"}
              borderColor={"blue.border"}
              color={"blue.border"}
            >
              <Edit className="size-4" />
            </Button>
          </Link>
        </Tooltip>
        {/* <Tooltip content="Switch Status" showArrow>
          <Span>
            <Switch.Root
              checked={product?.isActive}
              onCheckedChange={(e) => handleStatusSwitch(e.checked)}
            >
              <Switch.HiddenInput />
              {isPending ? <Spinner /> : <Switch.Control />}
            </Switch.Root>
          </Span>
        </Tooltip> */}
      </HStack>
    </>
  );
};

export default ProductTableActions;
