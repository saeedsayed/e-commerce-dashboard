"use client";
import { IFolder } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Folder, FolderPen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import Modal from "@/components/common/Modal";
import { Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

type props = {
  onSelectFolder: (folder: IFolder) => void;
  selectedFolder: IFolder | null;
};

const FolderList = ({ onSelectFolder, selectedFolder }: props) => {
  const [isDelModOpen, setIsDelModOpen] = useState<boolean>(false);
  const [targetDelFolder, setTargetDelFolder] = useState<string>("");
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["folder-list"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosInstance.get<{
        data: { folders: IFolder[] };
      }>("/media-library/folders");
      return data.folders;
    },
  });
  const deleteFolder = async (folderId: string) => {
    await axiosInstance.delete(`/media-library/folders/${folderId}`);
  };
  const { mutate: deleteDirector, isPending } = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      toast.success("Folder deleted successfully");
      refetch();
      setIsDelModOpen(false);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errMessage =
        err.response?.data?.message || "filed to delete folder! try again";
      toast.error(errMessage);
      setIsDelModOpen(false);
    },
  });
  if (isLoading)
    return (
      <>
        <Center h="full">
          <Spinner size={"xl"} />
        </Center>
      </>
    );
  return (
    <>
      <Flex
        as="ul"
        flexDir={"column"}
        h={"calc(100% - 1.3rem)"}
        overflow={"auto"}
        paddingBlock={4}
      >
        {data?.map((folder) => (
          <Flex
            as="li"
            alignItems={"center"}
            _hover={{ bg: "bg.emphasized" }}
            p={2}
            bg={selectedFolder?._id === folder?._id ? "bg.muted" : ""}
            className={` ${selectedFolder?._id === folder._id ? "bg-base-300" : ""}`}
            key={folder._id}
          >
            <Tooltip content={folder.folderTitle} showArrow>
              <button
                onClick={() => {
                  onSelectFolder(folder);
                }}
                className="flex gap-1 items-center flex-1 cursor-pointer truncate"
              >
                <div>
                  <Folder className="size-10 lg:size-10" />
                </div>
                <div>
                  <Text textAlign={"start"}>{folder.folderTitle}</Text>
                  <Text opacity={0.5} textAlign={"start"}>
                    items: 0
                  </Text>
                </div>
              </button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                size={"xs"}
                variant={"ghost"}
                _hover={{ color: "red.border" }}
                onClick={() => {
                  setIsDelModOpen(true);
                  setTargetDelFolder(folder._id);
                }}
              >
                <Trash />
              </Button>
            </Tooltip>
            <Button variant={"ghost"} size={"xs"}>
              <FolderPen />
            </Button>
          </Flex>
        ))}
        {isRefetching && <div className="loading loading-spinner size-16" />}
      </Flex>
      <Modal
        isOpen={isDelModOpen}
        message="Are you absolutely certain you want to permanently remove this folder and everything inside it? Once deleted, this action cannot be reversed."
        confirmText={isPending ? "Deleting..." : "Delete"}
        onCancel={() => setIsDelModOpen(false)}
        onConfirm={() => deleteDirector(targetDelFolder)}
        variant="danger"
        classes="max-w-md"
      />
    </>
  );
};

export default FolderList;
