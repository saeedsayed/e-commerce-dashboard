import Input from "@/components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/ui/Textarea";
import NumberInput from "@/components/ui/NumberInput";
import { HStack } from "@chakra-ui/react";
import {
  createCouponSchema,
  TCreateCouponSchema,
} from "@/schemas/createCoupon";
import Menu from "@/components/ui/Menu";
import DatePicker from "@/components/ui/DatePicker";

type Props = {
  onSubmit: SubmitHandler<TCreateCouponSchema>;
  isSubmitting: boolean;
  initialValues?: TCreateCouponSchema;
  formId: string;
};

const CouponForm = ({
  onSubmit,
  isSubmitting,
  initialValues,
  formId,
}: Props) => {
  // form controller
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCouponSchema),
    defaultValues: initialValues || { discountType: "fixed" },
  });
  return (
    <>
      {/* create product form modal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-2"
      >
        <Input
          id="code"
          label={"Coupon Code"}
          placeholder={"enter the Coupon Code"}
          err={!!errors.code}
          errMes={errors.code?.message}
          register={register("code")}
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

        <NumberInput
          name="discountValue"
          label={"Discount Value"}
          control={control}
          err={!!errors.discountValue || !!errors.discountType}
          errMes={
            errors.discountValue?.message +
            " and " +
            errors?.discountType?.message
          }
          disabled={isSubmitting}
          startElement={getValues("discountType") === "fixed" ? "$" : "%"}
          endElement={
            <Menu
              items={[
                { label: "Fixed Price", value: "fixed" },
                { label: "Percentage", value: "percentage" },
              ]}
              buttonText="Select Discount Type"
              onSelect={(v) => {
                if (!!v.value) clearErrors("discountType");
                setValue("discountType", v.value as "fixed" | "percentage");
                if (v.value === "fixed")
                  setValue("maxDiscountAmount", undefined);
              }}
            />
          }
        />
        <HStack align={"start"}>
          <NumberInput
            name="usageLimit"
            control={control}
            min={0}
            label="Usage Limit"
            err={!!errors.usageLimit}
            errMes={errors.usageLimit?.message}
          />
          <NumberInput
            name="minOrderAmount"
            control={control}
            min={0}
            label="Min Order Amount"
            err={!!errors.minOrderAmount}
            errMes={errors.minOrderAmount?.message}
          />
          {getValues("discountType") === "percentage" && (
            <NumberInput
              name="maxDiscountAmount"
              control={control}
              min={0}
              label="Max Discount Amount"
              err={!!errors.maxDiscountAmount}
              errMes={errors.maxDiscountAmount?.message}
            />
          )}
        </HStack>
        <DatePicker
          name="expiryDateRange"
          control={control}
          err={!!errors?.expiryDateRange}
          errMsg={errors?.expiryDateRange?.message}
          selectionMode="range"
        />
        {/* tags input */}
        {/* <FieldRoot invalid={!!errors.regions}>
          <TagsInput.Root
            value={getValues("regions")}
            onValueChange={(details) => {
              setValue("regions", details.value);
              if (!!details.value.length) clearErrors("regions");
            }}
          >
            <TagsInput.Label>regions</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="Add tags then press enter" />
              <TagsInput.ClearTrigger />
            </TagsInput.Control>
          </TagsInput.Root>
          {!!errors.regions && (
            <Field.ErrorText>{errors.regions?.message}</Field.ErrorText>
          )}
        </FieldRoot> */}
      </form>
    </>
  );
};

export default CouponForm;
