import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@chakra-ui/react";

import Textarea from "@/components/ui/Textarea";
import {
  createCategorySchema,
  TCreateCategorySchema,
} from "@/schemas/createCategory";

type Props = {
  onSubmit: SubmitHandler<TCreateCategorySchema>;
  isSubmitting: boolean;
  initialValues?: TCreateCategorySchema;
  formId: string;
};

const CategoryForm = ({
  onSubmit,
  isSubmitting,
  initialValues,
  formId,
}: Props) => {
  // state
  const [choseFileModalIsOpen, setChoseFileModalIsOpen] =
    useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  // form controller
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: initialValues || {},
  });
  // handle open File modal
  const handleFileModal = () => setChoseFileModalIsOpen((p) => !p);
  return (
    <>
      {/* create product form modal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-2"
      >
        <Input
          id="name"
          label={"Category name"}
          placeholder={"enter the category name"}
          err={!!errors.name}
          errMes={errors.name?.message}
          register={register("name")}
          disabled={isSubmitting}
        />
        <Textarea
          id="description"
          label={"product description"}
          placeholder={"enter the product description"}
          err={!!errors.description}
          errMes={errors.description?.message}
          register={register("description")}
          disabled={isSubmitting}
        />
        {/* thumbnail */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4>Thumbnail* :</h4>
          {!!getValues("image") ? (
            <div className="size-32 relative">
              {" "}
              <Image
                src={getValues("image")||""}
                alt="image"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <p>Select Thumbnail 👇</p>
          )}
        </div>
        {!!errors?.image && (
          <Text color={"red.border"} fontSize={"sm"}>
            {errors.image?.message}
          </Text>
        )}
        {/* select thumbnail button */}
        <Button
          className="btn"
          onClick={() => handleFileModal()}
          type="button"
          border={"2px solid"}
          borderColor={errors?.image ? "red.border" : ""}
        >
          Chose thumbnail <FileImage />
        </Button>
      </form>
      {/* select thumbnail from media library modal */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => handleFileModal()}
        onConfirm={() => {
          if (!!selectedFiles.length) clearErrors("image");

          setValue("image", selectedFiles[0]);

          handleFileModal();
        }}
        title="select product thumbnail"
        size="cover"
      >
        <div className="h-full">
          <MediaLibrary
            choseMediaMode={"single"}
            onChoseMedia={(media) => {
              setSelectedFiles(media.map((m) => m.secure_url));
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CategoryForm;
