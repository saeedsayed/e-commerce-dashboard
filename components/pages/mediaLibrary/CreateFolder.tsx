"use client";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateFolder = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
    useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");
  const queryClient = useQueryClient();
  const createFolder = async () => {
    try {
      await axiosInstance.post("/media-library/folders", {
        folderTitle: folderName,
      });
    } catch (err) {
      throw err;
    }
  };
  const { mutate: create, isPending } = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      setIsCreateFolderModalOpen(false);
      toast.success("Folder created successfully");
      queryClient.invalidateQueries({ queryKey: ["folder-list"] });
      setFolderName("");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errMessage =
        err.response?.data?.message || "Folder create field! try again";
      setIsCreateFolderModalOpen(false);
      toast.error(errMessage);
      setFolderName("");
    },
  });
  return (
    <>
      <Button
        onClick={() => setIsCreateFolderModalOpen(true)}
      >
        New folder <Plus />
      </Button>
      <Modal
        isOpen={isCreateFolderModalOpen}
        confirmText={isPending ? "Creating..." : "Create new folder"}
        onConfirm={() => create()}
        onCancel={() => setIsCreateFolderModalOpen(false)}
        title="Create new folder"
      >
        <Input
          id="folderName"
          placeholder="The folder name"
          label="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CreateFolder;
