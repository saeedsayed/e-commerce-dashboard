"use client";
import { Link } from "@/i18n/navigation";
import { IFolder } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import CreateFolder from "./CreateFolder";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Folder, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import Modal from "@/components/common/Modal";

const FolderList = () => {
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
    onError: (err: AxiosError) => {
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
    <section>
      <CreateFolder />
      <ul className="p-8 flex flex-wrap gap-4 lg:gap-8 justify-start items-center">
        {data?.map((folder) => (
          <li key={folder._id} className="relative group">
            <button
              className="btn btn-error rounded-2xl absolute z-0 top-3 start-2 p-0 h-23 w-12 justify-start group-hover:-start-5 transition-all"
              onClick={() => {
                setIsDelModOpen(true);
                setTargetDelFolder(folder._id);
              }}
            >
              <Trash />
            </button>
            <Link href={`/media-library/${folder._id}`}>
              <Folder className="size-18 lg:size-30 fill-warning text-warning z-10 relative" />
              <p className="text-lg lg:text-2xl text-center opacity-70">
                {folder.folderTitle}
              </p>
            </Link>
          </li>
        ))}
        {isRefetching && <div className="loading loading-spinner size-16" />}
      </ul>
      <Modal
        isOpen={isDelModOpen}
        message="Are You sure to delete this folder and any data inside it! this action can't restore"
        confirmText={isPending ? "Deleting..." : "Delete"}
        onCancel={() => setIsDelModOpen(false)}
        onConfirm={() => deleteDirector(targetDelFolder)}
      />
    </section>
  );
};

export default FolderList;
