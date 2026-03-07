import ImagePreview from "@/components/common/ImagePreview";
import Modal from "@/components/ui/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

type Props = {
  folderId: string;
};

const UploadFiles = ({ folderId }: Props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const uploadFiles = async () => {
    const formData = new FormData();
    [...selectedFiles].forEach((file) => {
      formData.append("media", file as unknown as Blob);
    });
    try {
      await axiosInstance.post(
        `/media-library/folders/${folderId}/files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  const { mutate: upload, isPending } = useMutation({
    mutationFn: uploadFiles,
    onError: (err) => {
      console.log("err", err);
      setUploadErr("Failed to upload files. Please try again.");
      setSelectedFiles([]);
    },
    onSuccess: () => {
      toast.success("Files uploaded successfully!");
      setUploadErr(null);
      setSelectedFiles([]);
      queryClient.invalidateQueries({ queryKey: ["folderMedia", folderId] });
    },
  });
  return (
    <>
      {uploadErr && <p className="text-sm text-red-500 mb-1">{uploadErr}</p>}
      <label>
        <Button as="span">
          Upload new file <Plus />
        </Button>
        <FileUploader
          classes="hidden!"
          onTypeError={(err: string) => setUploadErr(err)}
          onSizeError={(err: string) => setUploadErr(err)}
          name="images"
          types={["JPG", "PNG", "GIF", "JPEG", "WEBP"]}
          multiple
          maxSize={4}
          onSelect={(e) => setSelectedFiles(e as unknown as File[])}
        />
      </label>
      <Modal
        isOpen={selectedFiles.length > 0}
        showCloseButton={true}
        confirmText={isPending ? "Uploading..." : "Upload"}
        onCancel={() => setSelectedFiles([])}
        onConfirm={() => upload()}
        title="Confirm Upload"
        variant="info"
      >
        <p className="text-sm mb-2">
          Upload {selectedFiles.length} file(s) with{" "}
          {(
            [...selectedFiles].reduce((acc, file) => acc + file.size, 0) /
            1024 /
            1024
          ).toFixed(2)}{" "}
          MB total ?
        </p>
        <ul className="space-y-2 flex flex-wrap items-center gap-1">
          {[...selectedFiles].map((file) => (
            <li key={file.name}>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-22 h-22 object-contain rounded-md"
                width={64}
                height={64}
                onClick={() => setImagePreviewUrl(URL.createObjectURL(file))}
              />
            </li>
          ))}
        </ul>
      </Modal>
      <ImagePreview
        isOpen={!!imagePreviewUrl}
        images={[imagePreviewUrl] as string[]}
        onClose={() => setImagePreviewUrl(null)}
      />
    </>
  );
};

export default UploadFiles;
