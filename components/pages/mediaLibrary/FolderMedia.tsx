"use client";
import { IFile, IFolderWithFiles } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UploadFiles from "./UploadFiles";
import ImagePreview from "@/components/common/ImagePreview";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";

type Props = {
  folderId: string;
};

const FolderMedia = ({ folderId }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
  const [imagePreviewUrl, setImagePreviewURL] = useState<string | null>(null);
  const [isDelModOpen, setIsDelModOpen] = useState<boolean>(false);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["folderMedia", folderId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        data: { folder: IFolderWithFiles };
      }>(`/media-library/folders/${folderId}`);
      return data.data.folder;
    },
  });

  const deleteMedia = async () => {
    await axiosInstance.delete(`/media-library/folders/${folderId}/files`, {
      data: {
        fileIds: selectedFiles.map((file) => file._id),
      },
    });
  };
  const { mutate: deleteSelectedFiles, isPending } = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      refetch();
      setSelectedFiles([]);
      setIsDelModOpen(false);
      toast.success("deleted files successfully");
    },
    onError: () => {
      setIsDelModOpen(false);
      toast.error("delete files field! try again");
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
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-sm text-gray-600">Folder name:</span>{" "}
          {data?.folderTitle}
        </h1>
        <div className="flex items-center gap-1.5">
          {selectedFiles.length > 0 && (
            <button
              className="btn btn-soft btn-error btn-sm"
              onClick={() => setIsDelModOpen(true)}
            >
              {isPending ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <>
                  Delete <Trash />
                </>
              )}
            </button>
          )}
          <UploadFiles folderId={folderId} />
          <span className="text-sm text-gray-500">
            ({selectedFiles.length} selected)
          </span>
          <label>
            <input
              type="checkbox"
              className="checkbox border-primary text-primary"
              checked={selectedFiles.length === data?.files.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedFiles(data?.files || []);
                } else {
                  setSelectedFiles([]);
                }
              }}
            />
          </label>
        </div>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.files.map((file) => (
          <div
            key={file._id}
            className="border rounded p-4 flex flex-col gap-1 justify-between relative"
          >
            {/* select label */}
            <label className="absolute top-2 end-2">
              <input
                type="checkbox"
                className="checkbox border-primary text-primary"
                checked={selectedFiles.some((f) => f._id === file._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFiles([...selectedFiles, file]);
                  } else {
                    setSelectedFiles(
                      selectedFiles.filter((f) => f._id !== file._id),
                    );
                  }
                }}
              />
            </label>
            <Image
              src={file.fileUrl}
              alt={file.publicId}
              width={100}
              height={100}
              className="w-full object-contain rounded m-auto"
              onClick={() => setImagePreviewURL(file.fileUrl)}
            />
            <h3>
              <p className="font-semibold">
                {new Date(file.createdAt).toLocaleString("en-US", {
                  weekday: "short",
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-500 text-ellipsis overflow-hidden">
                {file.publicId}
              </p>
            </h3>
          </div>
        ))}
        {isRefetching && (
          <div className="flex justify-center items-center">
            <div className="loading loading-spinner loading-lg size-16"></div>
          </div>
        )}
      </section>
      <ImagePreview
        isOpen={!!imagePreviewUrl}
        images={[imagePreviewUrl] as string[]}
        onClose={() => setImagePreviewURL(null)}
      />
      <Modal
        isOpen={isDelModOpen}
        onCancel={() => setIsDelModOpen(false)}
        onConfirm={() => deleteSelectedFiles()}
        message="Are you sure you want to delete this file(s)? This action cannot be undone."
        confirmText={isPending ? "Deleting..." : "Delete"}
        title="Delete File(s)"
        variant="danger"
      />
    </main>
  );
};

export default FolderMedia;
