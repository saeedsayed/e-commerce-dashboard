import Input from "@/components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/ui/Textarea";
import {
  createShippingMethodSchema,
  TCreateShippingMethodSchema,
} from "@/schemas/createShippingMethod";
import NumberInput from "@/components/ui/NumberInput";
import { Field, FieldRoot, HStack, TagsInput } from "@chakra-ui/react";

type Props = {
  onSubmit: SubmitHandler<TCreateShippingMethodSchema>;
  isSubmitting: boolean;
  initialValues?: TCreateShippingMethodSchema;
  formId: string;
};

const ShippingMethodForm = ({
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
    resolver: zodResolver(createShippingMethodSchema),
    defaultValues: initialValues || {},
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
        <HStack>
          <NumberInput
            name="cost"
            control={control}
            min={0}
            label="Cost"
            err={!!errors.cost}
            errMes={errors.cost?.message}
          />
          <NumberInput
            name="estimatedDeliveryDays"
            control={control}
            min={0}
            label="Estimated Delivery Days"
             err={!!errors.estimatedDeliveryDays}
            errMes={errors.estimatedDeliveryDays?.message}
          />
        </HStack>
        {/* tags input */}
        <FieldRoot invalid={!!errors.regions}>
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
        </FieldRoot>
      </form>
    </>
  );
};

export default ShippingMethodForm;
