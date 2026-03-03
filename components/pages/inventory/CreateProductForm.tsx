import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { TCreateProductForm } from "@/schemas/createProduct";
import { FileImage, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICategory } from "@/types";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: (state: boolean) => void;
  onSubmit: SubmitHandler<TCreateProductForm>;
  isSubmitting: boolean;
  formController: UseFormReturn<TCreateProductForm>;
};

const CreateProductForm = ({
  modalIsOpen,
  setModalIsOpen,
  onSubmit,
  isSubmitting,
  formController,
}: Props) => {
  // state
  const [choseFileModalIsOpen, setChoseFileModalIsOpen] =
    useState<boolean>(false);
  // form controller
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = formController;
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
  return (
    <>
      {" "}
      {/* create product form modal */}
      <Modal
        isOpen={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false);
          reset();
        }}
        onConfirm={() => {}}
        title="Create a new product"
        formId="createProductForm"
        classes="max-w-md"
        confirmText={isSubmitting ? "Creating..." : "Create"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="createProductForm"
          className="flex flex-col gap-2"
        >
          <Input
            id="title"
            required
            label={"product name"}
            err={!!errors.title}
            errMes={errors.title?.message}
            placeholder={"enter the product name"}
            register={register("title")}
            disabled={isSubmitting}
          />
          <Input
            id="description"
            required
            label={"product description"}
            err={!!errors.description}
            errMes={errors.description?.message}
            placeholder={"enter the product description"}
            register={register("description")}
            type="text"
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
            onClick={() => setChoseFileModalIsOpen(true)}
            type="button"
          >
            Chose thumbnail <FileImage />
          </button>
          <div className="flex gap-2 items-end">
            <Input
              id="price"
              required
              label={"price"}
              err={!!errors.price}
              errMes={errors.price?.message}
              placeholder={"enter the product price"}
              onChange={({ target: { value } }) => {
                if (+value === 0) return setValue("price", -1);
                setValue("price", +value);
                if (!!value) clearErrors("price");
              }}
              disabled={isSubmitting}
            />
            <Input
              id="discount"
              label={"discount"}
              err={!!errors.discount}
              errMes={errors.discount?.message}
              placeholder={"enter the product discount"}
              onChange={({ target: { value } }) => {
                setValue("discount", +value);
                if (!!value) clearErrors("discount");
              }}
              disabled={isSubmitting}
            />
          </div>
          <Input
            required
            id="stock"
            label={"product stock"}
            err={!!errors.stock}
            type="number"
            min={0}
            errMes={errors.stock?.message}
            placeholder={"enter the product stock"}
            onChange={({ target: { value } }) => {
              if (+value === 0) return setValue("stock", -1);
              setValue("stock", +value);
              if (!Number.isNaN(+value)) clearErrors("stock");
            }}
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
      </Modal>
      {/* select thumbnail from media library modal */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => setChoseFileModalIsOpen(false)}
        onConfirm={() => setChoseFileModalIsOpen(false)}
        title="select product thumbnail"
        classes="max-w-mx"
      >
        <div className="h-[calc(100vh-200px)] -m-4 p-4">
          <MediaLibrary
            choseMediaMode="single"
            onChoseMedia={(media) => {
              if (media.length) clearErrors("thumbnail");
              setValue("thumbnail", media[0]?.fileUrl);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateProductForm;
