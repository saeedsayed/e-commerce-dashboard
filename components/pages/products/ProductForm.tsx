import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import {
  createProductSchema,
  TCreateProductForm,
} from "@/schemas/createProduct";
import { FileImage } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Field,
  FieldRoot,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Menu from "@/components/ui/Menu";
import NumberInput from "@/components/ui/NumberInput";
import TextEditor from "@/components/ui/TextEditor";
import ProductCard from "./ProductCard";

type Props = {
  onSubmit: SubmitHandler<TCreateProductForm>;
  isSubmitting: boolean;
  initialValues?: TCreateProductForm;
};

type TChoseFileMode = "thumbnail" | "images" | null;

const ProductForm = ({ onSubmit, isSubmitting, initialValues }: Props) => {
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
    watch,
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
      <Grid templateColumns={"1fr auto"} gap={4} justifyContent={"center"}>
        <GridItem>
          <Box position={"sticky"} top={4}>
            {/* create product form modal */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
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
              <TextEditor
                defaultValue={getValues("description")}
                onChange={(v) => {
                  setValue("description", v);
                  if (!!v) clearErrors("description");
                }}
                placeholder="write the product description"
              />
              <FieldRoot invalid={!!errors?.description} mt={-3}>
                {!!errors.description && (
                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                )}
              </FieldRoot>
              <HStack align={"start"}>
                {/* thumbnail */}
                <VStack align={"start"}>
                  <Button
                    className="btn"
                    onClick={() => handleFileModal("thumbnail")}
                    type="button"
                    border={"2px solid"}
                    borderColor={errors?.thumbnail ? "red.border" : ""}
                  >
                    Chose thumbnail <FileImage />
                  </Button>
                  {!!errors?.thumbnail && (
                    <Text color={"red.border"} fontSize={"sm"}>
                      {errors.thumbnail?.message}
                    </Text>
                  )}
                </VStack>
                <VStack>
                  {/* images */}
                  <Button
                    className="btn"
                    onClick={() => handleFileModal("images")}
                    type="button"
                    borderColor={errors?.images ? "red.border" : ""}
                  >
                    Chose images <FileImage />
                  </Button>
                  {!!errors?.images && (
                    <Field.ErrorText>{errors.images?.message}</Field.ErrorText>
                  )}
                </VStack>
              </HStack>
              {/* price field */}
              <Flex gap={2}>
                <NumberInput
                  name="price"
                  label="Price"
                  control={control}
                  err={!!errors.price}
                  min={0}
                  defaultValue={getValues("price")}
                  errMes={errors.price?.message}
                />
                <NumberInput
                  name="discount"
                  label="Discount"
                  control={control}
                  err={!!errors.discount}
                  min={0}
                  defaultValue={getValues("discount")}
                  errMes={errors.discount?.message}
                />
                <NumberInput
                  name="stock"
                  label="Stock"
                  control={control}
                  err={!!errors.stock}
                  min={0}
                  defaultValue={getValues("stock")}
                  errMes={errors.stock?.message}
                />
              </Flex>
              {/* select category field */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <Menu
                  buttonText={
                    <Text display={"flex"} alignItems={"center"} gap={2}>
                      Select categories {isCategoriesFetching && <Spinner />}
                    </Text>
                  }
                  items={
                    categories?.map((c) => ({
                      label: c.name,
                      value: c.name,
                    })) || [{ label: <Spinner margin={"auto"} />, value: "" }]
                  }
                  onSelect={(e) => {
                    const oldVal = getValues("category") || [];
                    if (oldVal.some((v) => v === e.value)) return;
                    setValue("category", [...oldVal, e.value]);
                    clearErrors("category");
                  }}
                />
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
                  <p>Select category</p>
                )}
              </div>
              {!!errors?.category && (
                <Text color={"red.border"} fontSize={"sm"}>
                  {errors.category?.message}
                </Text>
              )}
              {/* submit button */}
              <Button loading={isSubmitting} type="submit" w={"xs"} ms={"auto"}>
                {initialValues?"Update":"Create"}
              </Button>
            </form>
          </Box>
        </GridItem>
        <GridItem>
          {/* eslint-disable-next-line react-hooks/incompatible-library */}
          <ProductCard product={{ ...watch() }} />
        </GridItem>
      </Grid>
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
