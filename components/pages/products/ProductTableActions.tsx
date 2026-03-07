import Modal from "@/components/ui/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import EditProduct from "./EditProduct";
import { Button, Flex } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

const ProductTableActions = ({ productId }: { productId: string }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteProduct = async () => {
    await axiosInstance.delete(`/products/${productId}`);
  };
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
      setDeleteModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to delete product! try again");
    },
  });
  return (
    <>
      <Flex gap={2}>
        <Tooltip content="Delete" showArrow>
          <Button
            onClick={() => setDeleteModalIsOpen(true)}
            size={"xs"}
            variant={"outline"}
            borderColor={"red.border"}
            color={"red.border"}
          >
            <Trash className="size-4" />
          </Button>
        </Tooltip>
        <EditProduct productId={productId} />
      </Flex>
      <Modal
        isOpen={deleteModalIsOpen}
        message="Are you absolutely certain you want to permanently remove this product? Once deleted, this action cannot be reversed."
        confirmText={isPending ? "Deleting..." : "Delete"}
        onCancel={() => setDeleteModalIsOpen(false)}
        onConfirm={() => handleDelete()}
        variant="danger"
        classes="max-w-md"
      />
    </>
  );
};

export default ProductTableActions;
