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
import Modal from "@/components/ui/Modal";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

type Props = {
  folderId: string;
  onSelectFile?: (files: IFile[]) => void;
  selectMode?: "multiple" | "single";
};

const FolderMedia = ({ folderId, onSelectFile, selectMode }: Props) => {
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

  const handleSelect = (files: IFile[]) => {
    if (
      (selectMode === "single" &&
        selectedFiles.length === 1 &&
        files.length > 1) ||
      (selectMode === "single" && files.length > 1)
    )
      return toast.error("you can't select more then one file");
    setSelectedFiles(files);
    onSelectFile?.(files);
  };

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
      handleSelect([]);
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
    <Box h={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        pe={6}
      >
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-sm text-gray-600">Folder name:</span>{" "}
          {data?.folderTitle}
        </h1>
        <div className="flex items-center gap-1.5">
          {selectedFiles.length > 0 && (
            <Button
              variant={"outline"}
              borderColor={"red.border"}
              color={"red.border"}
              onClick={() => setIsDelModOpen(true)}
            >
              {isPending ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <>
                  Delete <Trash />
                </>
              )}
            </Button>
          )}
          <UploadFiles folderId={folderId} />
          <span className="text-sm text-gray-500">
            ({selectedFiles.length} selected)
          </span>
          <Checkbox.Root
            checked={
              !!selectedFiles.length &&
              selectedFiles.length < (data?.files.length || 0)
                ? "indeterminate"
                : +selectedFiles.length === +(data?.files.length || 0)
            }
            onCheckedChange={(e) => {
              if (e.checked) {
                handleSelect(data?.files || []);
              } else {
                handleSelect([]);
              }
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            {/* <Checkbox.Label>Weekdays</Checkbox.Label> */}
          </Checkbox.Root>
        </div>
      </Flex>
      <Grid
        templateColumns={"repeat(2, 1fr)"}
        md={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        lg={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        xl={{ gridTemplateColumns: "repeat(5, auto)" }}
        gap={3}
        pe={2}
        pb={4}
        h={"calc(100% - 3rem)"}
        overflowY={"auto"}
      >
        {data?.files.map((file) => (
          <GridItem
            key={file._id}
            border="1px solid"
            borderColor={"border.emphasized"}
            h={"fit"}
            position={"relative"}
          >
            {/* select label */}

            <Checkbox.Root
              position={"absolute"}
              top={2}
              className="end-2"
              color={"red.border"}
              checked={selectedFiles.some((f) => f._id === file._id)}
              onCheckedChange={(e) => {
                if (!!e.checked) {
                  handleSelect([...selectedFiles, file]);
                } else {
                  handleSelect(selectedFiles.filter((f) => f._id !== file._id));
                }
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>

            <Image
              src={file.fileUrl}
              alt={file.publicId}
              width={500}
              height={500}
              // className="w-full h-full object-contain rounded m-autos "
              onClick={() => setImagePreviewURL(file.fileUrl)}
            />
            <Heading size={"sm"} mt={2}>
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
              <Text fontSize={"sm"} color={"GrayText"}>
                {file.publicId}
              </Text>
            </Heading>
          </GridItem>
        ))}
        {isRefetching && (
          <div className="flex justify-center items-center">
            <div className="loading loading-spinner loading-lg size-16"></div>
          </div>
        )}
      </Grid>
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
    </Box>
  );
};

export default FolderMedia;
