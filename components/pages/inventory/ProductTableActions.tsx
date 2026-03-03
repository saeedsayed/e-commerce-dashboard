import Modal from "@/components/common/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

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
      toast.success("Product created successfully");
      setDeleteModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to create product! try again");
    },
  });
  return (
    <>
      <div className="flex gap-2">
        <button
          className="btn btn-xs btn-error text-base-content"
          onClick={() => setDeleteModalIsOpen(true)}
        >
          Delete <Trash className="size-4" />
        </button>
        <button
          className="btn btn-xs btn-info text-base-content"
          onClick={() => {
            toast.error("feature not working yet");
          }}
        >
          Edit <Edit className="size-4" />
        </button>
      </div>
      <Modal
        isOpen={deleteModalIsOpen}
        message="Are you absolutely certain you want to permanently remove this folder and everything inside it? Once deleted, this action cannot be reversed."
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
