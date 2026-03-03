"use client";
import { IFolder } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Folder, FolderPen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import Modal from "@/components/common/Modal";

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
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      </>
    );
  return (
    <section className="h-full overflow-auto pe-4">
      <ul className="list">
        {data?.map((folder) => (
          <li
            className={`list-row -me-4 px-4 rounded-none gap-1 flex ${selectedFolder?._id === folder._id ? "bg-base-300" : ""}`}
            key={folder._id}
          >
            <button
              onClick={() => {
                onSelectFolder(folder);
              }}
              className="flex gap-1 items-center flex-1 cursor-pointer"
            >
              <div>
                <Folder className="size-10 lg:size-10 fill-warning text-warning" />
              </div>
              <div>
                <div>{folder.folderTitle}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  items: 0
                </div>
              </div>
            </button>
            <button
              className="btn btn-square btn-ghost tooltip tooltip-bottom tooltip-error text-error"
              data-tip="Delete"
              onClick={() => {
                setIsDelModOpen(true);
                setTargetDelFolder(folder._id);
              }}
            >
              <Trash />
            </button>
            <button
              className="btn btn-square btn-ghost tooltip tooltip-info tooltip-bottom"
              data-tip="Rename"
            >
              <FolderPen />
            </button>
          </li>
        ))}
        {isRefetching && <div className="loading loading-spinner size-16" />}
      </ul>
      <Modal
        isOpen={isDelModOpen}
        message="Are you absolutely certain you want to permanently remove this folder and everything inside it? Once deleted, this action cannot be reversed."
        confirmText={isPending ? "Deleting..." : "Delete"}
        onCancel={() => setIsDelModOpen(false)}
        onConfirm={() => deleteDirector(targetDelFolder)}
        variant="danger"
        classes="max-w-md"
      />
    </section>
  );
};

export default FolderList;
