import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import {
  createProductSchema,
  TCreateProductForm,
} from "@/schemas/createProduct";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Field, Flex, Spinner, Tag, Text } from "@chakra-ui/react";
import Menu from "@/components/ui/Menu";
import NumberInput from "@/components/common/NumberInput";
import Textarea from "@/components/common/Textarea";

type Props = {
  onSubmit: SubmitHandler<TCreateProductForm>;
  isSubmitting: boolean;
  initialValues?: TCreateProductForm;
  formId: string;
};

type TChoseFileMode = "thumbnail" | "images" | null;

const ProductForm = ({
  onSubmit,
  isSubmitting,
  initialValues,
  formId,
}: Props) => {
  // state
  const [choseFileModalIsOpen, setChoseFileModalIsOpen] =
    useState<boolean>(false);
  const [choseFileMode, setChoseFileMode] = useState<TChoseFileMode>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  // form controller
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialValues || {},
  });
  //   get categories api call
  const getCategories = async () => {
    const {
      data: { data: categories },
    } = await axiosInstance.get<{ data: ICategory[] }>("/categories");
    return categories;
  };
  //   get categories query
  const { data: categories, isFetching: isCategoriesFetching } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });
  // handle open File modal
  const handleFileModal = (mode: TChoseFileMode) => {
    if (!!mode) {
      setChoseFileModalIsOpen(true);
      setChoseFileMode(mode);
    } else {
      setChoseFileModalIsOpen(false);
      setChoseFileMode(null);
    }
  };
  return (
    <>
      {/* create product form modal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-2"
      >
        <Input
          id="title"
          label={"product name"}
          placeholder={"enter the product name"}
          err={!!errors.title}
          errMes={errors.title?.message}
          register={register("title")}
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
          {!!getValues("thumbnail") ? (
            <div className="size-32 relative">
              {" "}
              <Image
                src={getValues("thumbnail")}
                alt="thumbnail"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <p>Select Thumbnail 👇</p>
          )}
        </div>
        {!!errors?.thumbnail && (
          <Text color={"red.border"} fontSize={"sm"}>
            {errors.thumbnail?.message}
          </Text>
        )}
        {/* select thumbnail button */}
        <Button
          className="btn"
          onClick={() => handleFileModal("thumbnail")}
          type="button"
          border={"2px solid"}
          borderColor={errors?.thumbnail ? "red.border" : ""}
        >
          Chose thumbnail <FileImage />
        </Button>
        {/* images */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4>images :</h4>
          {!!getValues("images") ? (
            getValues("images")?.map((image) => (
              <div key={image} className="size-32 relative">
                {" "}
                <Image
                  src={image}
                  alt="images"
                  fill
                  className="object-contain"
                />
              </div>
            ))
          ) : (
            <p>Select images 👇</p>
          )}
        </div>
        {!!errors?.images && (
          <Field.ErrorText>{errors.images?.message}</Field.ErrorText>
        )}
        {/* select images button */}
        <Button
          className="btn"
          onClick={() => handleFileModal("images")}
          type="button"
          borderColor={errors?.images ? "red.border" : ""}
        >
          Chose images <FileImage />
        </Button>
        {/* price field */}
        <Flex gap={2}>
          <NumberInput
            name="price"
            control={control}
            err={!!errors.price}
            min={0}
            defaultValue={getValues("price")}
            errMes={errors.price?.message}
          />
          <NumberInput
            name="discount"
            control={control}
            err={!!errors.discount}
            min={0}
            defaultValue={getValues("discount")}
            errMes={errors.discount?.message}
          />
        </Flex>
        <NumberInput
          name="stock"
          control={control}
          err={!!errors.stock}
          min={0}
          defaultValue={getValues("stock")}
          errMes={errors.stock?.message}
        />
        {/* select category field */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4>Categories :</h4>
          {!!getValues("category")?.length ? (
            getValues("category")?.map((category: string) => (
              <Tag.Root key={category}>
                <Tag.Label>{category}</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger
                    type="button"
                    onClick={() => {
                      const filteredValue = getValues("category").filter(
                        (c: string) => c !== category,
                      );
                      setValue("category", filteredValue);
                      clearErrors("category");
                    }}
                  />
                </Tag.EndElement>
              </Tag.Root>
            ))
          ) : (
            <p>Select category 👇</p>
          )}
        </div>
        {!!errors?.category && (
          <Text color={"red.border"} fontSize={"sm"}>
            {errors.category?.message}
          </Text>
        )}
        <Menu
          buttonText={
            <Text display={"flex"} alignItems={"center"} gap={2}>
              Select categories {isCategoriesFetching && <Spinner />}
            </Text>
          }
          items={
            categories?.map((c) => ({ label: c.name, value: c.name })) || [
              { label: <Spinner margin={"auto"} />, value: "" },
            ]
          }
          onSelect={(e) => {
            const oldVal = getValues("category") || [];
            if (oldVal.some((v) => v === e.value)) return;
            setValue("category", [...oldVal, e.value]);
            clearErrors("category");
          }}
        />
      </form>
      {/* select thumbnail from media library modal */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => handleFileModal(null)}
        onConfirm={() => {
          if (!choseFileMode) return;
          if (!!selectedFiles.length) clearErrors(choseFileMode);
          if (choseFileMode === "thumbnail") {
            setValue("thumbnail", selectedFiles[0]);
          } else {
            setValue(choseFileMode, selectedFiles);
          }
          handleFileModal(null);
        }}
        title="select product thumbnail"
        size="cover"
      >
        <div className="h-full">
          <MediaLibrary
            choseMediaMode={
              choseFileMode === "thumbnail" ? "single" : "multiple"
            }
            onChoseMedia={(media) => {
              setSelectedFiles(media.map((m) => m.fileUrl));
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
