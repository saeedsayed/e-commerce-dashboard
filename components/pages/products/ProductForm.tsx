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
  Button,
  CheckboxCard,
  Field,
  FieldRoot,
  Grid,
  GridItem,
  HStack,
  Span,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Menu from "@/components/ui/Menu";
import NumberInput from "@/components/ui/NumberInput";
import TextEditor from "@/components/ui/TextEditor";
import ProductCard from "./ProductCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  onSubmit: SubmitHandler<TCreateProductForm>;
  isSubmitting: boolean;
  initialValues?: TCreateProductForm;
};

type TChoseFileMode = "thumbnail" | "images" | null;

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const WEIGHT_UNITS = [
  { label: "Milligram", value: "MG" },
  { label: "Gram", value: "G" },
  { label: "Kilogram", value: "KG" },
];

const DIMENSION_UNITS = [
  { label: "Millimeter", value: "MM" },
  { label: "Centimeter", value: "CM" },
  { label: "Meter", value: "M" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Fetches all categories from the API. Defined outside the component so it is
 *  not recreated on every render. */
const fetchCategories = async (): Promise<ICategory[]> => {
  const {
    data: { data: categories },
  } = await axiosInstance.get<{ data: ICategory[] }>("/categories");
  return categories;
};

/** Combines two optional error messages, filtering out empty strings so that
 *  no trailing / leading commas appear. */
const combineErrMes = (...messages: (string | undefined)[]): string =>
  messages.filter(Boolean).join(", ");

// ─── Component ────────────────────────────────────────────────────────────────

const ProductForm = ({ onSubmit, isSubmitting, initialValues }: Props) => {
  // ── Local state ──────────────────────────────────────────────────────────
  const [choseFileModalIsOpen, setChoseFileModalIsOpen] = useState(false);
  const [choseFileMode, setChoseFileMode] = useState<TChoseFileMode>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // ── Form ─────────────────────────────────────────────────────────────────
  // NOTE: Generic <TCreateProductForm> ensures full type-safety across all
  // register / setValue / getValues / watch calls.
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm<TCreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialValues ?? {},
  });

  // ── Derived watched values ────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedCategories = watch("category") ?? [];
  const watchedSizes = watch("sizes") ?? [];
  const watchedWeightUnit = watch("weight.unit");
  const watchedLengthUnit = watch("dimensions.length.unit");
  const watchedWidthUnit = watch("dimensions.width.unit");
  const watchedHeightUnit = watch("dimensions.height.unit");
  const watchedDepthUnit = watch("dimensions.depth.unit");

  // ── Categories query ─────────────────────────────────────────────────────
  const { data: categories, isFetching: isCategoriesFetching } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });

  // ── Handlers ─────────────────────────────────────────────────────────────

  /** Opens the media-library modal in the given mode, or closes it when null. */
  const handleFileModal = (mode: TChoseFileMode) => {
    if (mode) {
      // Reset previous selection so stale files are never carried over.
      setSelectedFiles([]);
      setChoseFileModalIsOpen(true);
      setChoseFileMode(mode);
    } else {
      setChoseFileModalIsOpen(false);
      setChoseFileMode(null);
    }
  };

  const handleConfirmMedia = () => {
    if (!choseFileMode) return;

    if (selectedFiles.length) clearErrors(choseFileMode);

    if (choseFileMode === "thumbnail") {
      setValue("thumbnail", selectedFiles[0]);
    } else {
      setValue(choseFileMode, selectedFiles);
    }

    handleFileModal(null);
  };

  const handleAddCategory = (value: string) => {
    if (watchedCategories.some((v) => v === value)) return;
    setValue("category", [...watchedCategories, value]);
    clearErrors("category");
  };

  const handleRemoveCategory = (category: string) => {
    const filtered = watchedCategories.filter((c) => c !== category);
    setValue("category", filtered);
    // Only clear the error when there is still at least one category left,
    // otherwise let the schema report the validation error on submit.
    if (filtered.length) clearErrors("category");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Grid templateColumns="1fr auto" gap={4} justifyContent="center">
        {/* ── Left column: form ─────────────────────────────────────────── */}
        <GridItem>
          {/* <Box position="sticky" top={4}> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Title */}
            <Input
              id="title"
              label="Product name"
              placeholder="Enter the product name"
              err={!!errors.title}
              errMes={errors.title?.message}
              register={register("title")}
              disabled={isSubmitting}
            />

            {/* Description */}
            <TextEditor
              defaultValue={getValues("description")}
              onChange={(v) => {
                setValue("description", v);
                if (v) clearErrors("description");
              }}
              placeholder="Write the product description"
            />
            <FieldRoot invalid={!!errors?.description} mt={-3}>
              {errors.description && (
                <Field.ErrorText>{errors.description.message}</Field.ErrorText>
              )}
            </FieldRoot>

            {/* Media & category row */}
            <HStack align="start">
              {/* Thumbnail picker */}
              <VStack align="start">
                <Button
                  className="btn"
                  onClick={() => handleFileModal("thumbnail")}
                  type="button"
                  border="2px solid"
                  borderColor={errors?.thumbnail ? "red.border" : ""}
                >
                  Choose thumbnail <FileImage />
                </Button>
                {errors?.thumbnail && (
                  <Text color="red.border" fontSize="sm">
                    {errors.thumbnail.message}
                  </Text>
                )}
              </VStack>

              {/* Images picker */}
              <VStack align="start">
                <Button
                  className="btn"
                  onClick={() => handleFileModal("images")}
                  type="button"
                  border="2px solid"
                  borderColor={errors?.images ? "red.border" : ""}
                >
                  Choose images <FileImage />
                </Button>
                {errors?.images && (
                  <Field.ErrorText>{errors.images.message}</Field.ErrorText>
                )}
              </VStack>

              {/* Category selector */}
              <VStack align="start">
                <HStack>
                  <Menu
                    buttonText={
                      <Text display="flex" alignItems="center" gap={2}>
                        Select categories {isCategoriesFetching && <Spinner />}
                      </Text>
                    }
                    items={
                      categories?.map((c) => ({
                        label: c.name,
                        value: c.name,
                      })) ?? [{ label: <Spinner margin="auto" />, value: "" }]
                    }
                    onSelect={(e) => handleAddCategory(e.value)}
                  />

                  {watchedCategories.length ? (
                    watchedCategories.map((category) => (
                      <Tag.Root key={category} size="lg">
                        <Tag.Label>{category}</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                          />
                        </Tag.EndElement>
                      </Tag.Root>
                    ))
                  ) : (
                    <Text fontSize="sm" color="gray.400">
                      No category selected
                    </Text>
                  )}
                </HStack>

                {errors?.category && (
                  <Text color="red.border" fontSize="sm">
                    {errors.category.message}
                  </Text>
                )}
              </VStack>
            </HStack>

            {/* ── Price Details ──────────────────────────────────────── */}
            <HStack alignItems="center">
              <Span flex={1} h={1} bg="bg.emphasized" />
              <Text>Price Details</Text>
              <Span flex={1} h={1} bg="bg.emphasized" />
            </HStack>

            <Grid gap={2} templateColumns="repeat(4, 1fr)">
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
                name="cost"
                label="Cost"
                control={control}
                err={!!errors.cost}
                min={0}
                defaultValue={getValues("cost")}
                errMes={errors.cost?.message}
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

              {/* ── Dimensions Details ────────────────────────────────── */}
              <GridItem colSpan={4} mt={4}>
                <HStack alignItems="center">
                  <Span flex={1} h={1} bg="bg.emphasized" />
                  <Text>Dimensions Details</Text>
                  <Span flex={1} h={1} bg="bg.emphasized" />
                </HStack>
              </GridItem>

              {/* Weight */}
              <GridItem colSpan={2}>
                <NumberInput
                  name="weight.value"
                  label="Weight"
                  control={control}
                  err={!!errors.weight?.unit || !!errors.weight?.value}
                  min={0}
                  defaultValue={getValues("weight")?.value}
                  errMes={combineErrMes(
                    errors.weight?.value?.message,
                    errors.weight?.unit?.message,
                  )}
                  startElement={watchedWeightUnit}
                  endElement={
                    <Menu
                      buttonText="unit"
                      items={WEIGHT_UNITS}
                      onSelect={(e) => {
                        if (e.value) clearErrors("weight.unit");
                        setValue("weight.unit", e.value);
                      }}
                    />
                  }
                />
              </GridItem>

              {/* Sizes */}
              <GridItem colSpan={2}>
                <Text fontSize="sm">Select Sizes</Text>
                <HStack wrap="wrap" mt={1}>
                  {SIZES.map((size) => (
                    <CheckboxCard.Root
                      key={size}
                      size="sm"
                      checked={watchedSizes.includes(size)}
                      onCheckedChange={(e) => {
                        if (e.checked) {
                          setValue("sizes", [...watchedSizes, size]);
                        } else {
                          setValue(
                            "sizes",
                            watchedSizes.filter((s) => s !== size),
                          );
                        }
                      }}
                    >
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>{size}</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  ))}
                </HStack>
              </GridItem>

              {/* Length */}
              <NumberInput
                name="dimensions.length.value"
                label="Length"
                control={control}
                err={
                  !!errors.dimensions?.length?.unit ||
                  !!errors.dimensions?.length?.value
                }
                min={0}
                defaultValue={getValues("dimensions.length")?.value}
                errMes={combineErrMes(
                  errors.dimensions?.length?.value?.message,
                  errors.dimensions?.length?.unit?.message,
                )}
                startElement={watchedLengthUnit}
                endElement={
                  <Menu
                    buttonText="Unit"
                    items={DIMENSION_UNITS}
                    onSelect={(e) => {
                      if (e.value) clearErrors("dimensions.length.unit");
                      setValue("dimensions.length.unit", e.value);
                    }}
                  />
                }
              />

              {/* Width */}
              <NumberInput
                name="dimensions.width.value"
                label="Width"
                control={control}
                err={
                  !!errors.dimensions?.width?.unit ||
                  !!errors.dimensions?.width?.value
                }
                min={0}
                defaultValue={getValues("dimensions.width")?.value}
                errMes={combineErrMes(
                  errors.dimensions?.width?.value?.message,
                  errors.dimensions?.width?.unit?.message,
                )}
                startElement={watchedWidthUnit}
                endElement={
                  <Menu
                    buttonText="Unit"
                    items={DIMENSION_UNITS}
                    onSelect={(e) => {
                      if (e.value) clearErrors("dimensions.width.unit");
                      setValue("dimensions.width.unit", e.value);
                    }}
                  />
                }
              />

              {/* Height */}
              <NumberInput
                name="dimensions.height.value"
                label="Height"
                control={control}
                err={
                  !!errors.dimensions?.height?.unit ||
                  !!errors.dimensions?.height?.value
                }
                min={0}
                defaultValue={getValues("dimensions.height")?.value}
                errMes={combineErrMes(
                  errors.dimensions?.height?.value?.message,
                  errors.dimensions?.height?.unit?.message,
                )}
                startElement={watchedHeightUnit}
                endElement={
                  <Menu
                    buttonText="Unit"
                    items={DIMENSION_UNITS}
                    onSelect={(e) => {
                      if (e.value) clearErrors("dimensions.height.unit");
                      setValue("dimensions.height.unit", e.value);
                    }}
                  />
                }
              />

              <NumberInput
                name="dimensions.depth.value"
                label="Depth"
                control={control}
                err={
                  !!errors.dimensions?.depth?.unit ||
                  !!errors.dimensions?.depth?.value
                }
                min={0}
                defaultValue={getValues("dimensions.depth")?.value}
                errMes={combineErrMes(
                  errors.dimensions?.depth?.value?.message,
                  errors.dimensions?.depth?.unit?.message,
                )}
                startElement={watchedDepthUnit}
                endElement={
                  <Menu
                    buttonText="Unit"
                    items={DIMENSION_UNITS}
                    onSelect={(e) => {
                      if (e.value) clearErrors("dimensions.depth.unit");
                      setValue("dimensions.depth.unit", e.value);
                    }}
                  />
                }
              />
            </Grid>

            {/* Submit */}
            <Button loading={isSubmitting} type="submit" w="xs" ms="auto">
              {initialValues ? "Update" : "Create"}
            </Button>
          </form>
          {/* </Box> */}
        </GridItem>

        {/* ── Right column: live preview ─────────────────────────────────── */}
        <GridItem>
          <ProductCard product={{ ...watch() }} />
        </GridItem>
      </Grid>

      {/* ── Media library modal ──────────────────────────────────────────── */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => handleFileModal(null)}
        onConfirm={handleConfirmMedia}
        title={
          choseFileMode === "thumbnail"
            ? "Select product thumbnail"
            : "Select product images"
        }
        size="cover"
      >
        <div className="h-full">
          <MediaLibrary
            choseMediaMode={
              choseFileMode === "thumbnail" ? "single" : "multiple"
            }
            onChoseMedia={(media) =>
              setSelectedFiles(media.map((m) => m.fileUrl))
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
