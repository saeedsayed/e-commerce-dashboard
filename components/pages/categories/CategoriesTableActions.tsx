import Modal from "@/components/ui/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Flex } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import EditCategory from "./EditCategory";
import { ICategory } from "@/types";

const CategoriesTableActions = ({ category }: { category: ICategory }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteCategory = async () => {
    await axiosInstance.delete(`/categories/${category._id}`);
  };
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("category deleted successfully");
      setDeleteModalIsOpen(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("failed to delete category! try again");
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
        <EditCategory category={category} />
      </Flex>
      <Modal
        isOpen={deleteModalIsOpen}
        message="Are you absolutely certain you want to permanently remove this category? Once deleted, this action cannot be reversed."
        confirmText={isPending ? "Deleting..." : "Delete"}
        onCancel={() => setDeleteModalIsOpen(false)}
        onConfirm={() => handleDelete()}
        variant="danger"
        classes="max-w-md"
      />
    </>
  );
};

export default CategoriesTableActions;
