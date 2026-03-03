import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import {
  createProductSchema,
  TCreateProductForm,
} from "@/schemas/createProduct";
import { FileImage, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

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
  // form controller
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
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
  const { data: categories, isFetching } = useQuery({
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
          required
          id="title"
          label={"product name"}
          placeholder={"enter the product name"}
          err={!!errors.title}
          errMes={errors.title?.message}
          register={register("title")}
          disabled={isSubmitting}
        />
        <Input
          required
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
          <p className="text-[#df1b41] font-bold text-sm">
            {errors.thumbnail?.message}
          </p>
        )}
        {/* select thumbnail button */}
        <button
          className="btn btn-primary"
          onClick={() => handleFileModal("thumbnail")}
          type="button"
        >
          Chose thumbnail <FileImage />
        </button>
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
          <p className="text-[#df1b41] font-bold text-sm">
            {errors.images?.message}
          </p>
        )}
        {/* select images button */}
        <button
          className="btn btn-primary"
          onClick={() => handleFileModal("images")}
          type="button"
        >
          Chose images <FileImage />
        </button>
        {/* price field */}
        <div className="flex gap-2 items-end">
          <Input
            required
            id="price"
            type="number"
            min={0}
            label={"price"}
            placeholder={"the product price"}
            err={!!errors.price}
            errMes={errors.price?.message}
            onChange={({ target: { value } }) => {
              if (+value <= 0) return setValue("price", 0);
              setValue("price", +value);
              if (!!value) clearErrors("price");
            }}
            defaultValue={getValues("price")}
            disabled={isSubmitting}
          />
          <Input
            id="discount"
            label={"discount"}
            placeholder={"the product discount"}
            type="number"
            min={0}
            err={!!errors.discount}
            errMes={errors.discount?.message}
            onChange={({ target: { value } }) => {
              setValue("discount", +value);
              if (!!value) clearErrors("discount");
            }}
            defaultValue={getValues("discount")}
            disabled={isSubmitting}
          />
        </div>
        <Input
          required
          id="stock"
          label={"product stock"}
          placeholder={"enter the product stock"}
          err={!!errors.stock}
          type="number"
          min={0}
          errMes={errors.stock?.message}
          onChange={({ target: { value } }) => {
            if (+value === 0) return setValue("stock", -1);
            setValue("stock", +value);
            if (!Number.isNaN(+value)) clearErrors("stock");
          }}
          defaultValue={getValues("stock")}
        />
        {/* select category field */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4>Categories :</h4>
          {!!getValues("category")?.length ? (
            getValues("category")?.map((category: string) => (
              <p className="badge badge-info h-auto" key={category}>
                {category}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    const filteredValue = getValues("category").filter(
                      (c: string) => c !== category,
                    );
                    setValue("category", filteredValue);
                    clearErrors("category");
                  }}
                >
                  <X className="size-4" />
                </button>
              </p>
            ))
          ) : (
            <p>Select category 👇</p>
          )}
        </div>
        {!!errors?.category && (
          <p className="text-[#df1b41] font-bold text-sm">
            {errors.category?.message}
          </p>
        )}
        <div className="dropdown dropdown-top dropdown-center">
          <button tabIndex={0} role="button" className="btn m-1 w-full">
            select categories
            {isFetching && <div className="loading loading-spinner" />}
          </button>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-300 rounded-box z-1 w-full p-2 shadow-sm"
          >
            {categories?.map((category) => (
              <li key={category._id}>
                <button
                  className="p-2 cursor-pointer hover:bg-base-200"
                  type="button"
                  onClick={() => {
                    const oldValue = getValues("category") || [];
                    if (oldValue.some((v: string) => v === category.name))
                      return;
                    setValue("category", [...oldValue, category.name]);
                    if (getValues("category").length) clearErrors("category");
                  }}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
      {/* select thumbnail from media library modal */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => handleFileModal(null)}
        onConfirm={() => handleFileModal(null)}
        title="select product thumbnail"
        classes="max-w-mx"
      >
        <div className="h-[calc(100vh-200px)] -m-4 p-4">
          <MediaLibrary
            choseMediaMode={
              choseFileMode === "thumbnail" ? "single" : "multiple"
            }
            onChoseMedia={(media) => {
              if (!choseFileMode) return;
              if (media.length) clearErrors(choseFileMode);
              if (choseFileMode === "thumbnail")
                return setValue("thumbnail", media[0]?.fileUrl);

              setValue(
                choseFileMode,
                media.map((m) => m.fileUrl),
              );
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
